class CustomForm extends HTMLElement {

  connectedCallback() {
    // Grab the form (the first one, and only _one_.)
    this._form = this.querySelector('form');
    this._hasErrors = [];
    // If there isn't a form, quit.
    if (!this._form) {
      return;
    }
    // Only initialize once.
    if (!this._isInitialized) { 
      this._init();
    }
  }

  get _fields() {
    if (!this._form) {
      return [];
    }
    return Array.from(this._form.elements);
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

  get _messages() {
    return {
      // Messages
      valueMissing: 'Please fill out this field.',
      typeMismatchEmail: 'Please enter an email address.',
      typeMismatchURL: 'Please enter a URL.',
      tooShort: `Please lengthen this text to ${field.minLength} characters or more. You are currently using ${field.value.length} characters.`,
      tooLong: `Please shorten this text to no more than {maxLength} characters. You are currently using ${field.value.length} characters.`,
      patternMismatch: 'Please match the requested format.',
      badInput: 'Please enter a number.',
      stepMismatch: 'Please select a valid value.',
      rangeOverflow: `Please select a value that is no more than ${field.max}.`,
      rangeUnderflow: `Please select a value that is no less than ${field.min}.`,
      generic: 'The value you entered for this field is invalid.',
    }
  }

  _determineMessage(field, validityType) {
    console.log(field, validityType);
    var messages = {
          // Messages
          valueMissing: 'Please fill out this field.',
          typeMismatchEmail: 'Please enter an email address.',
          typeMismatchUrl: 'Please enter a URL.',
          tooShort: `Please lengthen this text to ${field.minLength} characters or more. You are currently using ${field.value.length} characters.`,
          tooLong: `Please shorten this text to no more than {maxLength} characters. You are currently using ${field.value.length} characters.`,
          patternMismatch: 'Please match the requested format.',
          badInput: 'Please enter a number.',
          stepMismatch: 'Please select a valid value.',
          rangeOverflow: `Please select a value that is no more than ${field.max}.`,
          rangeUnderflow: `Please select a value that is no less than ${field.min}.`,
          generic: 'The value you entered for this field is invalid.',
        }
    if (typeof field._getCustomMessage == 'function') {
      return field._getCustomMessage(validityType);
    }
    // Differentiate type mismatch messages
    if (validityType === 'typeMismatch') {
      let key = `${validityType}${field.type[0].toUpperCase()}${field.type.slice(1)}`
      console.log(key);
      return messages[key];
    }
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
    console.log(field, error);
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
    // Before remove error callback
    this._beforeRemoveError(field);

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Remove error class to field
    field.classList.remove(this._fieldErrorClass);

    // If the field is a radio button and part of a group, remove error from all and get the last item in the group
    if (field.type === 'radio' && field.name) {
      var group = Array.from(document.getElementsByName(field.name));
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

  _hasError(field) {
    // Check if this field should be excluded from validation.
    if (this._shouldNotValidate(field)) {
      return;
    }
    // cache a reference to validityState
    let validity = field.validity;

    // field is valid, return:
    if (validity.valid) {
      return;
    }
    for (var type of this._validityTypes) {
      console.log(type);
      if (validity[type] === true) {
        return this._determineMessage(field, type);
      }
    }

    return this._determineMessage(field, 'generic');
  }
  _blurHandler(event) {
      var field = event.target;
      // Validate the field
      var error = this._hasError(field);

      // If there's an error, show it
      if (error) {
        this._showError(field, error);
        return;
      }

      // Otherwise, remove any errors that exist
      this._removeError(field);
    };

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

  _hasSupport() {
    var inp = document.createElement('input');
    return ('validityState' in inp);
  }

  _init() {
    this._isInitialized = true;
    this._form.setAttribute('novalidate', '');
    this.addEventListener('blur', this._blurHandler, true);
    this.addEventListener('submit', this._submitHandler, false);
  }
  _destroy() {
    this.disconnectedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener('blur', this._blurHandler, true);
    this.addEventListener('submit', this._submitHandler, false);
  }
}