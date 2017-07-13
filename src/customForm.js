export default class extends HTMLElement {

  connectedCallback() {
    this._hasErrors = [];
    this._customControls = new Map();
    // Only initialize DOM stuff once.
    if (!this._isInitialized) {
      window.requestAnimationFrame(() => this._init());
    }
  }

  _init() {
    // Grab the form (the first one, and only _one_.)
    this._form = this.querySelector('form');
    // If there isn't a form, quit.
    if (!this._form) {
      return;
    }
    this._isInitialized = true;
    this._form.setAttribute('novalidate', '');
    this.addEventListener('blur', this._blurHandler, true);
    this.addEventListener('submit', this._submitHandler, false);
    this.addEventListener('dashform:registercontrol', this._onregisterCustomControl.bind(this), false);
  }
  _destroy() {
    this.disconnectedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener('blur', this._blurHandler, true);
    this.addEventListener('submit', this._submitHandler, false);
  }

  get _fields() {
    if (!this._form) {
      return [];
    }
    return Array.prototype.slice.call(this._form.elements).map((field)=> {
      if (this._customControls.has(field)) {
        return this._customControls.get(field);
      } else {
        return field;
      }
    });
  }

  get _disableSubmit() {
    return false;
  }

  get _validityTypes() {
    return [
      "valueMissing",
      "typeMismatch",
      "tooShort",
      "tooLong",
      "patternMismatch",
      "badInput",
      "stepMismatch",
      "rangeOverflow",
      "rangeUnderflow",
    ]
  }

  get _ignoredTypes() {
    return ['field', 'submit', 'button', 'reset'];
  }

  get _errorClass() {
    return 'error-message';
  }

  get _fieldErrorClass() {
    return 'error';
  }

  
  _onregisterCustomControl(event) {
    // Set the field as the key in the custom controls map, with the field as value.
    this._customControls.set(event.detail.field, event.target);
    // Tell the custom control which form it now belongs to:
    event.target._setCustomForm(this);
    event.stopPropagation();
  }

  _determineMessage(field, validityType, customMessages) {
    function getProp(field, propname) {
      if (propname in field) {
        return field[propname];
      }
      if (field._field) {
        return field._field[propname];
      }
    }
    var minLength = getProp(field, 'minLength');
    var maxLength = getProp(field, 'maxLength');
    var charLength = getProp(field, 'value').length;
    var numMax = getProp(field, 'max');
    var numMin = getProp(field, 'min');
    var messages = {
      // Messages
      valueMissing: 'Please fill out this field.',
      typeMismatchEmail: 'Please enter an email address.',
      typeMismatchUrl: 'Please enter a URL.',
      tooShort: `Please lengthen this text to ${minLength} characters or more. You are currently using ${charLength} characters.`,
      tooLong: `Please shorten this text to no more than ${maxLength} characters. You are currently using ${charLength} characters.`,
      patternMismatch: 'Please match the requested format.',
      badInput: 'Please enter a number.',
      stepMismatch: 'Please select a valid value.',
      rangeOverflow: `Please select a value that is no more than ${numMax}.`,
      rangeUnderflow: `Please select a value that is no less than ${numMin}.`,
      generic: 'The value you entered for this field is invalid.',
    }
    // If this is a custom field implementing the _getCustomMessage method,
    // and that method returns something, let that be the error message.
    if (typeof field._getCustomMessage == 'function') {
      let customMessage = field._getCustomMessage(validityType);
      if (customMessage) {
        return customMessage;
      }
    }
    // Differentiate type mismatch messages
    if (validityType === 'typeMismatch') {
      let key = `${validityType}${field.type[0].toUpperCase()}${field.type.slice(1)}`
      return messages[key];
    }
    // The patternMismatch type allows for a custom message to be specified 
    // using the title attribute on the input itself.
    if (validityType === 'patternMismatch' && field.hasAttribute('title')) {
      return field.getAttribute('title');
    }
    return field.validationMessage || messages[validityType];
  }

  _onSubmit(form, fields) {
    // placeholder, to override when extending.
  }
  _beforeShowError(field) {
    // placeholder, to override when extending. 
  }
  _afterShowError(field) {
    // placeholder, to override when extending.
  }

  _beforeRemoveError(field) {
    // placeholder, to override when extending.
  }

  _afterRemoveError(field) {
    // placeholder, to override when extending.
  }

  _showError(field, error) {

    // If this is a custom field, delegate to the custom method.
    if (typeof field._showError === 'function') {
      field._showError(error);
      return;
    }

    // Before show error callback
    this._beforeShowError(field, error);

    // Add error class to field
    field.classList.add(this._fieldErrorClass);

    // If the field is a radio button and part of a group, error all and get the last item in the group
    if (field.type === 'radio' && field.name) {
      var group = document.getElementsByName(field.name);
      group.forEach((item) => {
        if (item.form !== this._form) {
          return; // Only check fields in current form
        }
        item.classList.add(this._fieldErrorClass);
      });
    }

    // Get field id or name
    var id = field.id || field.name;
    if (!id) {
      return;
    }

    // Check if error message field already exists
    // If not, create one
    var message = this.querySelector(`.${this._errorClass}#error-for-${id}`);
    if (!message) {
      message = document.createElement('div');
      message.className = this._errorClass;
      message.id = 'error-for-' + id;

      // If the field is a radio button or checkbox, insert error after the label
      var label;
      if (field.type === 'radio' || field.type ==='checkbox') {
        label = this.querySelector(`label[for="${id}"]`) || field.closest('label');
        if (label) {
          label.parentElement.insertBefore( message, label.nextElementSibling );
        }
      }

      // Otherwise, insert it after the field
      if (!label) {
        field.parentElement.insertBefore( message, field.nextElementSibling );
      }
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

    // After show error callback
    this._afterShowError(field, error);
  }

  _removeError(field) {
    // If this is a custom field, delegate to the custom method.
    if (typeof field._removeError === 'function') {
      field._removeError(field);
      return;
    }
    // Before remove error callback
    this._beforeRemoveError(field);

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Remove error class to field
    field.classList.remove(this._fieldErrorClass);

    // If the field is a radio button and part of a group, remove error from all and get the last item in the group
    if (field.type === 'radio' && field.name) {
      var group = Array.protype.slice.call(document.getElementsByName(field.name));
      group.forEach((item) => {
        if (item.form !== this._form) {
          return; // Only check fields in current form
        }
        item.classList.remove(this._fieldErrorClass);
      });
    }

    // Get field id or name
    var id = field.id || field.name;
    if (!id) {
      return;
    }

    // Check if an error message is in the DOM
    var message = this.querySelector(`.${this._errorClass}#error-for-${id}`);
    if (!message) {
      return;
    }

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';

    // After remove error callback
    this._afterRemoveError(field);
  }

  _shouldNotValidate(field) {
    // Some types of fields should be ignored in terms of validity:
    // 1. Disabled form controls
    // 2. Descendants of disabled fieldsets
    // 3. Particular field types
    if (field.disabled || // 1
        field.closest('fieldset[disabled]') || // 2
        this._ignoredTypes.indexOf(field.type) > -1 // 3
        ) {
      return true;
    }
  }

  _hasError(field, customMessages) {
    // Check if this field should be excluded from validation.
    if (this._shouldNotValidate(field)) {
      return;
    }
    // cache a reference to validityState (or custom getter thereof).
    let validity = field.validity || field._getValidity();

    // field is valid, return:
    if (validity.valid) {
      return;
    }
    let validityTypes = field._validityTypes || this._validityTypes;

    for (var type of validityTypes) {
      if (validity[type] === true) {
        return this._determineMessage(field, type);
      }
    }

    return this._determineMessage(field, 'generic');
  }
  _blurHandler(event) {
    var field = event.target;

    if (this._customControls.has(field)) {
      field = this._customControls.get(field);
    }

    // Validate the field
    var error = this._hasError(field);

    // If there's an error, show it
    if (error) {
      this._showError(field, error);
      return;
    }

    // Otherwise, remove any errors that exist
    this._removeError(field);
  }

  _submitHandler(event) {
    this._hasErrors = [];
    this._fields.forEach((field) => {
      var error = this._hasError(field);
      if (error) {
        this._showError(field, error);
        this._hasErrors.push(field);
      }
    });
    // Prevent form from submitting if there are errors or submission is disabled
    if (this._hasErrors || this._disableSubmit) {
      event.preventDefault();
    }
    // If there are errors, focus on first element with error
    if (this._hasErrors.length > 0) {
      this._hasErrors[0].focus();
      return;
    }
    this._onSubmit(this._form, this._fields);
  }
}