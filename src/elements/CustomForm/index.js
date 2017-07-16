/**
 * @module src/CustomForm
 */


/**
 * Class for custom form wrapper elements.
 * @extends HTMLElement
 */
export default class extends HTMLElement {
  /**
   * Custom element reaction when element is connected to the DOM.
   */
  connectedCallback() {
    // Track errors, initialize as an empty Array.
    this._hasErrors = [];
    // Set the custom controls ”registry” to be a map, so that
    // we can use the actual HTML form field as key, and the custom field 
    // as value - this allows us to determine easily if a form field belongs
    // to a custom control when validating fields. 
    this._customControls = new Map();

    // Only initialize DOM stuff once.
    if (!this._isInitialized) {
      window.requestAnimationFrame(() => this._init());
    }
  }

  /**
   * Initialize the custom element, if the form exists. Otherwise, try again
   * later.
   */
  _init() {
    // Grab the form (the first one, and only _one_.)
    this._form = this.querySelector('form');
    
    // If there isn't a form, reinitialize again after a tick.
    if (!this._form) {
      window.requestAnimationFrame(() => this._init());
      return;
    }

    // If there is a form, we can set the flag and move on.
    this._isInitialized = true;

    // Set the `novalidate` attr so that native form validation messages
    // are disabled.
    this._form.setAttribute('novalidate', '');

    // When a field is blurred, handle validation.
    this.addEventListener('blur', this._blurHandler, true);

    // When the form is submitted, handle full validation
    this.addEventListener('submit', this._submitHandler, false);

    // Listen for custom element children registering as custom controls.
    this.addEventListener('customdashform:registercontrol',
      this._onregisterCustomControl.bind(this), false);
  }

  /**
   * Shortcut to programmatically disconnect, if needed.
   */
  _destroy() {
    this.disconnectedCallback();
  }

  /**
   * Custom element reaction for when the element is disconnected from the DOM.
   */
  disconnectedCallback() {
    this.removeEventListener('blur', this._blurHandler, true);
    this.addEventListener('submit', this._submitHandler, false);
  }

  /**
   * Getter for a list of fields/form controls.
   * These can be either straight up HTML form fields OR
   * custom controls.
   * @return {Array} - A list of fields, custom or native.
   */
  get _fields() {
    return Array.from(this._form.elements).map((field)=> {
      if (this._customControls.has(field)) {
        return this._customControls.get(field);
      } else {
        return field;
      }
    });
  }
  /**
   * Determines if the submit event of the <form> should be prevented after
   * processing validation.
   * @return {Boolean}
   */
  get _disableSubmit() {
    return false;
  }

  /**
   * List of validityTypes, as defined in the HTML5 standard.
   * @return {Array} - The list of strings of validity types.
   */
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
  /**
   * Some input types should be ignored by default.
   * @return {array} - Array of ignored input types.
   */
  get _ignoredTypes() {
    return ['field', 'submit', 'button', 'reset'];
  }
  /**
   * Class name for error messages.
   * @return {String} - class name.
   */
  get _errorClass() {
    return 'error-message';
  }
  /**
   * Class name for fields in invalid state.
   * @return {String} - class name
   */
  get _fieldErrorClass() {
    return 'error';
  }
  /**
   * Class name for labels associated with fields in error state.
   * @return {String} - class name.
   */
  get _labelErrorClass() {
    return `${this._fieldErrorClass}-label`;
  }

  /**
   * Handler for when custom child controls send and event for registering as
   * part of the form.
   * @param  {Event} event - the custom event triggered.
   */
  _onregisterCustomControl(event) {
    // Set the field as the key in the custom controls map, with the field as value.
    this._customControls.set(event.target._field, event.target);
    // Tell the custom control which form it now belongs to:
    event.target._setCustomForm(this);
    // Stop the event from bubbling further.
    event.stopPropagation();
  }

  /**
   * Figures out what the error message is for a particular form control.
   * @param  {Element} field - the HTML native form field or custom form control.
   * @param  {String} validityType - the validityType string, usually from native API.
   * @return {String} - the error message
   */
  _determineMessage(field, validityType) {
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
  /**
   * Placeholder callback after successful validation, to override
   * when extending.
   * @param  {Element} form - The <form> itself.
   * @param  {Array} fields - An array of fields.
   */
  _onSubmit(form, fields) {

  }

  /**
   * Gets the <label> element of a native form field.
   * @param  {Element} field - the native HTML form field
   * @return {(Element|null)} - The <label> element of the element, or null if none exists.
   */
  _getFieldLabel(field) {
    return this.querySelector(`label[for="${field.id}"]`) || field.closest('label');
  }


  /**
   * Creates an error element based on the field and message.
   * @param  {Element} field - The html form field
   * @param  {string} error - The error message
   * @return {Element} - The constructed error message element.
   */
  _createErrorMessage(field, error) {
    // Get field id or name
    let id = field.id || field.name;
    if (!id) {
      return;
    }

    // Check if error message field already exists
    // If not, create one
    let message = this.querySelector(`#error-for-${id}`);
    if (!message) {
      message = document.createElement('div');
      message.className = this._errorClass;
      message.id = 'error-for-' + id;

      // If the field is a radio button or checkbox, insert error after the label
      let label = this._getFieldLabel(field);
      if (label && (field.type === 'radio' || field.type ==='checkbox')) {
        label.parentElement.insertBefore( message, label.nextElementSibling );
      } else {
        field.parentElement.insertBefore( message, field.nextElementSibling );
      }
      if (label) {
        label.classList.add(this._labelErrorClass);
      }
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    return message;
  }
  /**
   * Reveal the error message, i.e. making it (re-)render in the DOM.
   * @param  {Element} message - The error message DOM element.
   */
  _revealErrorMessage(message) {
    message.style.display = 'block';
    message.style.visibility = 'visible';
  }
  /**
   * Initiate the chain of events that end up showing a certain error message.
   * @param  {Element} field - The HTML form field that the error pertains to.
   * @param  {String} error - The error message
   */
  _showError(field, error) {
    // If this is a custom field, delegate to the custom method.
    if (typeof field._showError === 'function') {
      field._showError(error);
      return;
    }

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
    let errorMessage = this._createErrorMessage(field, error);
    if (errorMessage) {
      this._revealErrorMessage(errorMessage);
    }
  }

  /**
   * Remove all traces of the error message / state from a field.
   * @param  {Element} field - The HTML form field in question.
   */
  _removeError(field) {
    // If this is a custom field, delegate to the custom method.
    if (typeof field._removeError === 'function') {
      field._removeError(field);
      return;
    }

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Remove error class to field
    field.classList.remove(this._fieldErrorClass);

    let label = this._getFieldLabel(field);
    if (label) {
      label.classList.remove(this._labelErrorClass);
    }

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
  }

  /** 
   * Some types of fields should be ignored in terms of validity:
   * 1. Disabled form controls
   * 2. Descendants of disabled fieldsets
   * 3. Particular field types
   */ 
  _shouldNotValidate(field) {
    
    if (field.disabled || // 1
        field._disabled ||
        field.closest('fieldset[disabled]') || // 2
        this._ignoredTypes.indexOf(field.type) > -1 // 3
        ) {
      return true;
    }
  }

  /**
   * Getter for the active button, after a submission is made.
   * @return {(Element|null)} - The element, or null if missing.
   */
  get _submissionButton() {
    let activeElement = document.activeElement;
    if (activeElement && activeElement.form === this._form) {
      return activeElement;
    }
    return null;
  }

  /**
   * Check if the form was submitted by a button with `formnovalidate` set.
   * @returns { boolean } - If the submit field had formnovalidate set.
   */
  _submittedWithFormnovalidate() {
    let submitBtn = this._submissionButton;
    if (submitBtn && submitBtn.hasAttribute('formnovalidate')) {
      return true;
    }
    return false;
  }
  
  /**
   * Validates a field and returns its error message if invalid.
   * @param  {Element}  field - the html form field or custom control element.
   * @return {(String|void)} - String if invalid, void else.
   */
  _hasError(field) {
    // Check if this field should be excluded from validation.
    if (this._shouldNotValidate(field)) {
      return;
    }
    // cache a reference to validityState (or custom getter thereof).
    let validity = field.validity || field._validity;

    // field is valid, return:
    if (validity.valid) {
      return;
    }
    let validityTypes = this._validityTypes;
    if (field._validityTypes && field._validityTypes.length > 0) {
      validityTypes = field._validityTypes;
    }

    for (var type of validityTypes) {
      if (validity[type] === true) {
        return this._determineMessage(field, type);
      }
    }

    return this._determineMessage(field, 'generic');
  }

  /**
   * Event handler for when a field is blurred. Validates the field in isolation.
   * @param  {Event} event - the event object
   */
  _blurHandler(event) {
    // By default, field is the blur target element.
    var field = event.target;

    // Check the custom controls map, replace field var with custom element out if so.
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

  /**
   * Listen to the submit event of the HTMLFormElement inside the custom form
   * validate all fields at that time, focus the first invalid field
   * @param  {Event} event - The submit event object.
   */
  _submitHandler(event) {
    if (this._submittedWithFormnovalidate()) {
      return;
    }
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
      let focus = ('focus' in this._hasErrors[0])? 'focus': '_focus';
      this._hasErrors[0][focus]();
      return;
    }
    this._onSubmit(this._form, this._fields);
  }
}