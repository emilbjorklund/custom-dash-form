export default class extends HTMLElement {
  connectedCallback() {
    if (!this._isInitialized) {
      window.requestAnimationFrame(() => this._init());
    }
  }

  _init() {
    console.log('initializing');
    if (!this._field) {
      // DOM not ready: try again.
      window.requestAnimationFrame(() => this._init());
      return;
    }
    console.log(this._field);
    this._registerAsCustomControl();
    this._isInitialized = true;
  }

  _getValidity() {
    return this._field.validity;
  }

  get _field() {
    return this.querySelector('input, select, textarea') || null;
  }

  get _form() {
    return this._field.form;
  }

  get _validityTypes() {
    return false;
  }

  _getCustomMessage(validityType) {
    let attrName = validityType.toLowerCase();
    if (this.hasAttribute(attrName)) {
      return this.getAttribute(attrName);
    }
    return false;
  }

  _showError(error) {
    if (this._customForm) {
      this._customForm._showError(this._field, error);
    }
  }

  _removeError(field) {
    if (this._customForm) {
      this._customForm._removeError(this._field, field);
    }
  }

  _registerAsCustomControl() {
    let event = new CustomEvent('dashform:registercontrol', {
      bubbles: true,
      detail: {
        field: this._field
      }
    });
    this.dispatchEvent(event);
  }

  _setCustomForm(element) {
    this._customForm = element;
  }
}