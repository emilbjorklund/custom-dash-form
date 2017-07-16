/**
 * This is a base for custom form controls, meaning custom elements wrapping
 * an HTML form field or some other similar custom construction that can 
 * be validated.
 *
 * It is expected that custom elements derived from this will have a parent 
 * element based on the CustomForm class, wrapping a normal <form>.
 *
 * By default, custom form controls can have attributes mapping to text for
 * custom validation messages, as DOM attributes on the custom
 * element itself. The names of these are lowercase variants of the standardized
 * validity types (valueMissing, patternMismatch etc).
 *
 * Example for when the required attribute is used (mapping to `valueMissing`): 
 * ```
 * <custom-control valuemissing="You must fill in this value, mate.">
 *   <input required>
 * </custom-control>
 * ```
 * This file does not define a custom element name: you must do that yourself.
 *
 * If you need different functionality, you can extend this class and 
 * override any methods you like. For example, if you’d like to wholesale translate
 * error messages, you can override the method for getting the custom error message
 * which then looks up the validityType in an object.
 *
 * Another example is if you build a wholly custom validation, which should then
 * override the _getValidity method (and other methods you need to override.)
 *
 * By default, the _getValidity method just delegates to the native validation,
 * via the parent CustomForm.
 */

export default class extends HTMLElement {
  connectedCallback() {
    // Since we do not know if required child elements
    // are present when the element is upgraded 
    // (see e.g https://github.com/w3c/webcomponents/issues/551),
    // run an initialization loop until all is well.
    if (!this._isInitialized) {
      window.requestAnimationFrame(() => this._init());
    }
  }

  _init() {
    if (!this._field) {
      // DOM not ready: try again.
      window.requestAnimationFrame(() => this._init());
      return;
    }
    this._registerAsCustomControl();
    this._isInitialized = true;
  }
  /**
   * Getter for the field validity of the field inside this control wrapper.
   * @return {Object} Validity Object
   */
  get _validity() {
    return this._field.validity;
  }

  /**
   * Get disabled status of field
   */
  get _disabled() {
    return this._field.disabled;
  }
  /**
   * Set disabled status
   * @param  {boolean} onoff - status of disabled property of the inner field.
   */
  set _disabled(onoff) {
    this._field.disabled = !!onoff;
  }


  /**
   * Getter for the HTML form field inside this control wrapper. You will need
   * to override this if you create a custom form control for types of controls
   * having multiple elements in a group, e.g. checkboxes and radio buttons.
   * @return {Element} Input, Select or Textarea.
   */
  get _field() {
    return this.querySelector('input, select, textarea') || null;
  }
  /**
   * Getter for the plain HTML <form> of the field.
   * @return {Element} HTMLFormElement
   */
  get _form() {
    return this._field.form;
  }
  /**
   * Getter for validityTypes custom to this field - default is false.
   * Override this to have fields with their own validity types.
   * @return {Arrau} An array of validityType strings.
   */
  get _validityTypes() {
    return [];
  }
  /**
   * Get a custom validation message for this form control. This implementation
   * takes the validityType string, lowercases it and checks the custom element
   * wrapper for an attribute of the same name, e.g `patternMismatch` becomes
   * `patternmismatch`. If such an attribute exists, return the text inside.
   * 
   * @param  {String} validityType The validityType key as string.
   * @return {String}              The validation message, or empty string.
   */
  _getCustomMessage(validityType) {
    let attrName = validityType.toLowerCase();
    if (this.hasAttribute(attrName)) {
      return this.getAttribute(attrName);
    }
    return '';
  }
  /**
   * Show the error rendering of this custom field. This is a default
   * implementation, which delegates back up to the parent CustomForm, if
   * on exists - if the custom field uses a different logic, it needs to 
   * be extended.
   * @param  {Element} field The field whose error is to be removed.
   * @return {void}
   */
  _showError(error) {
    if (this._customForm) {
      this._customForm._showError(this._field, error);
    }
  }
  /**
   * Remove the error rendering of this custom field. This is a default
   * implementation, which delegates back up to the parent CustomForm, if
   * on exists - if the custom field uses a different logic, it needs to 
   * be extended.
   * @param  {Element} field The field whose error is to be removed.
   * @return {void}
   */
  _removeError(field) {
    if (this._customForm) {
      this._customForm._removeError(this._field, field);
    }
  }
  /**
   * Focus the field programmatically.
   */
  _focus() {
    this._field.focus();
  }
  /**
   * Use a custom Event to signal a parent CustomForm that there is a
   * new form control.
   * @return {void}
   */
  _registerAsCustomControl() {
    // Create a custom DOM event, allow it to bubble.
    let event = new CustomEvent('customdashform:registercontrol', {
      bubbles: true
    });
    // Dispatch the event on the custom element wrapper:
    this.dispatchEvent(event);
  }
  /**
   * This method allows a parent CustomForm to "register" with the
   * child CustomFormControl, creating an easier lookup.
   * @param {Element} element An instance of CustomForm element 
   *                          (or extended versions thereof.)
   */
  _setCustomForm(element) {
    this._customForm = element;
  }
}