/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 120);
/******/ })
/************************************************************************/
/******/ ({

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CustomForm = __webpack_require__(50);

var _CustomForm2 = _interopRequireDefault(_CustomForm);

var _CustomFormControl = __webpack_require__(51);

var _CustomFormControl2 = _interopRequireDefault(_CustomFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @module src/CustomForm
 */

/**
 * Class for custom form wrapper elements.
 * @extends HTMLElement
 */
var _class = function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'connectedCallback',

    /**
     * Custom element reaction when element is connected to the DOM.
     */
    value: function connectedCallback() {
      var _this2 = this;

      // Track errors, initialize as an empty Array.
      this._hasErrors = [];
      // Set the custom controls ”registry” to be a map, so that
      // we can use the actual HTML form field as key, and the custom field 
      // as value - this allows us to determine easily if a form field belongs
      // to a custom control when validating fields. 
      this._customControls = new Map();

      // Only initialize DOM stuff once.
      if (!this._isInitialized) {
        window.requestAnimationFrame(function () {
          return _this2._init();
        });
      }
    }

    /**
     * Initialize the custom element, if the form exists. Otherwise, try again
     * later.
     */

  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      // Grab the form (the first one, and only _one_.)
      this._form = this.querySelector('form');

      // If there isn't a form, reinitialize again after a tick.
      if (!this._form) {
        window.requestAnimationFrame(function () {
          return _this3._init();
        });
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
      this.addEventListener('customdashform:registercontrol', this._onregisterCustomControl.bind(this), false);
    }

    /**
     * Shortcut to programmatically disconnect, if needed.
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.disconnectedCallback();
    }

    /**
     * Custom element reaction for when the element is disconnected from the DOM.
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('blur', this._blurHandler, true);
      this.addEventListener('submit', this._submitHandler, false);
    }

    /**
     * Getter for a list of fields/form controls.
     * These can be either straight up HTML form fields OR
     * custom controls.
     * @return {Array} - A list of fields, custom or native.
     */

  }, {
    key: '_onregisterCustomControl',


    /**
     * Handler for when custom child controls send and event for registering as
     * part of the form.
     * @param  {Event} event - the custom event triggered.
     */
    value: function _onregisterCustomControl(event) {
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

  }, {
    key: '_determineMessage',
    value: function _determineMessage(field, validityType) {
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
        tooShort: 'Please lengthen this text to ' + minLength + ' characters or more. You are currently using ' + charLength + ' characters.',
        tooLong: 'Please shorten this text to no more than ' + maxLength + ' characters. You are currently using ' + charLength + ' characters.',
        patternMismatch: 'Please match the requested format.',
        badInput: 'Please enter a number.',
        stepMismatch: 'Please select a valid value.',
        rangeOverflow: 'Please select a value that is no more than ' + numMax + '.',
        rangeUnderflow: 'Please select a value that is no less than ' + numMin + '.',
        generic: 'The value you entered for this field is invalid.'
        // If this is a custom field implementing the _getCustomMessage method,
        // and that method returns something, let that be the error message.
      };if (typeof field._getCustomMessage == 'function') {
        var customMessage = field._getCustomMessage(validityType);
        if (customMessage) {
          return customMessage;
        }
      }
      // Differentiate type mismatch messages
      if (validityType === 'typeMismatch') {
        var key = '' + validityType + field.type[0].toUpperCase() + field.type.slice(1);
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

  }, {
    key: '_onSubmit',
    value: function _onSubmit(form, fields) {}

    /**
     * Gets the <label> element of a native form field.
     * @param  {Element} field - the native HTML form field
     * @return {(Element|null)} - The <label> element of the element, or null if none exists.
     */

  }, {
    key: '_getFieldLabel',
    value: function _getFieldLabel(field) {
      return this.querySelector('label[for="' + field.id + '"]') || field.closest('label');
    }

    /**
     * Creates an error element based on the field and message.
     * @param  {Element} field - The html form field
     * @param  {string} error - The error message
     * @return {Element} - The constructed error message element.
     */

  }, {
    key: '_createErrorMessage',
    value: function _createErrorMessage(field, error) {
      // Get field id or name
      var id = field.id || field.name;
      if (!id) {
        return;
      }

      // Check if error message field already exists
      // If not, create one
      var message = this.querySelector('#error-for-' + id);
      if (!message) {
        message = document.createElement('div');
        message.className = this._errorClass;
        message.id = 'error-for-' + id;

        // If the field is a radio button or checkbox, insert error after the label
        var label = this._getFieldLabel(field);
        if (label && (field.type === 'radio' || field.type === 'checkbox')) {
          label.parentElement.insertBefore(message, label.nextElementSibling);
        } else {
          field.parentElement.insertBefore(message, field.nextElementSibling);
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

  }, {
    key: '_revealErrorMessage',
    value: function _revealErrorMessage(message) {
      message.style.display = 'block';
      message.style.visibility = 'visible';
    }
    /**
     * Initiate the chain of events that end up showing a certain error message.
     * @param  {Element} field - The HTML form field that the error pertains to.
     * @param  {String} error - The error message
     */

  }, {
    key: '_showError',
    value: function _showError(field, error) {
      var _this4 = this;

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
        group.forEach(function (item) {
          if (item.form !== _this4._form) {
            return; // Only check fields in current form
          }
          item.classList.add(_this4._fieldErrorClass);
        });
      }
      var errorMessage = this._createErrorMessage(field, error);
      if (errorMessage) {
        this._revealErrorMessage(errorMessage);
      }
    }

    /**
     * Remove all traces of the error message / state from a field.
     * @param  {Element} field - The HTML form field in question.
     */

  }, {
    key: '_removeError',
    value: function _removeError(field) {
      var _this5 = this;

      // If this is a custom field, delegate to the custom method.
      if (typeof field._removeError === 'function') {
        field._removeError(field);
        return;
      }

      // Remove ARIA role from the field
      field.removeAttribute('aria-describedby');

      // Remove error class to field
      field.classList.remove(this._fieldErrorClass);

      var label = this._getFieldLabel(field);
      if (label) {
        label.classList.remove(this._labelErrorClass);
      }

      // If the field is a radio button and part of a group, remove error from all and get the last item in the group
      if (field.type === 'radio' && field.name) {
        var group = Array.from(document.getElementsByName(field.name));
        group.forEach(function (item) {
          if (item.form !== _this5._form) {
            return; // Only check fields in current form
          }
          item.classList.remove(_this5._fieldErrorClass);
        });
      }

      // Get field id or name
      var id = field.id || field.name;
      if (!id) {
        return;
      }

      // Check if an error message is in the DOM
      var message = this.querySelector('.' + this._errorClass + '#error-for-' + id);
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

  }, {
    key: '_shouldNotValidate',
    value: function _shouldNotValidate(field) {

      if (field.disabled || // 1
      field._disabled || field.closest('fieldset[disabled]') || // 2
      this._ignoredTypes.indexOf(field.type) > -1 // 3
      ) {
          return true;
        }
    }

    /**
     * Getter for the active button, after a submission is made.
     * @return {(Element|null)} - The element, or null if missing.
     */

  }, {
    key: '_submittedWithFormnovalidate',


    /**
     * Check if the form was submitted by a button with `formnovalidate` set.
     * @returns { boolean } - If the submit field had formnovalidate set.
     */
    value: function _submittedWithFormnovalidate() {
      var submitBtn = this._submissionButton;
      if (submitBtn && submitBtn.hasAttribute('formnovalidate')) {
        return true;
      }
      return false;
    }

    /**
     * Validates a field and returns its error message if invalid.
     * @param  {Element}  field - the html form field or custom control element.
     * @return {Promise} - Returns a Promise, which resolves with either [field, message] or false.
     */

  }, {
    key: '_hasError',
    value: function _hasError(field) {
      var _this6 = this;

      field.dataset.pendingvalidation = true;
      // check if the field has a completely custom validator:
      if (field._isAsync && '_asyncHasError' in field) {
        // Note: this method MUST return a promise.
        return field._asyncHasError();
      }
      return new Promise(function (resolve, reject) {
        // Check if this field should be excluded from validation.
        if (_this6._shouldNotValidate(field)) {
          field.dataset.pendingvalidation = false;
          return resolve(false);
        }

        // cache a reference to validityState (or custom getter thereof).
        var validity = field.validity || field._validity;

        // field is valid, return:
        if (validity.valid) {
          return resolve(false);
        }

        // Ok, now we are sure that the field is invalid.
        // Check how it is invalid.
        var validityTypes = _this6._validityTypes;
        if (field._validityTypes && field._validityTypes.length > 0) {
          validityTypes = field._validityTypes;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = validityTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var type = _step.value;

            if (validity[type] === true) {
              return resolve([field, _this6._determineMessage(field, type)]);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return resolve([field, _this6._determineMessage(field, 'generic')]);
      });
    }

    /**
     * Event handler for when a field is blurred. Validates the field in isolation.
     * @param  {Event} event - the event object
     */

  }, {
    key: '_blurHandler',
    value: function _blurHandler(event) {
      var _this7 = this;

      // By default, field is the blur target element.
      var field = event.target;

      // Check the custom controls map, replace field var with custom element out if so.
      if (this._customControls.has(field)) {
        field = this._customControls.get(field);
      }

      // Validate the field
      var error = this._hasError(field).then(function (error) {
        // No error, remove existing error messages and return.
        if (!error) {
          _this7._removeError(field);
          return;
        }
        // If there's an error, show it

        var _error = _slicedToArray(error, 2),
            formField = _error[0],
            message = _error[1];

        _this7._showError(formField, message);
      });
    }
    /**
     * Validates all fields, normal and custom
     * @return {Promise} - returns a Promise of all fields.
     */

  }, {
    key: '_validateAll',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this8 = this;

        var validations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                validations = this._fields.map(function () {
                  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(field) {
                    var result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this8._hasError(field);

                          case 2:
                            result = _context.sent;
                            return _context.abrupt('return', result);

                          case 4:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this8);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context2.next = 3;
                return Promise.all(validations);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _validateAll() {
        return _ref.apply(this, arguments);
      }

      return _validateAll;
    }()

    /**
     * Listen to the submit event of the HTMLFormElement inside the custom form
     * validate all fields at that time, focus the first invalid field
     * @param  {Event} event - The submit event object.
     */

  }, {
    key: '_submitHandler',
    value: function _submitHandler(event) {
      var _this9 = this;

      if (this._submittedWithFormnovalidate()) {
        return;
      }
      // We must prevent default, since the handler is async.
      // Later, we re-submit if the form is all right.
      event.preventDefault();
      var fieldErrors = [];
      // Validate all the fields
      this._validateAll().then(function (errors) {
        var fields = errors.forEach(function (error) {
          if (!error) {
            return;
          }

          var _error2 = _slicedToArray(error, 2),
              field = _error2[0],
              message = _error2[1];

          _this9._showError(field, message);
          fieldErrors.push(field);
        });
        // If there are errors, focus on first element with error
        if (fieldErrors.length > 0) {
          var focus = 'focus' in fieldErrors[0] ? 'focus' : '_focus';
          fieldErrors[0][focus]();
          return;
        } else {
          if (_this9._disableSubmit) {
            return _this9._onSubmit(form, _this9._fields);
          }
          _this9._form.submit();
        }
        _this9._onSubmit(_this9._form, _this9._fields);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: '_fields',
    get: function get() {
      var _this10 = this;

      return Array.from(this._form.elements).map(function (field) {
        if (_this10._customControls.has(field)) {
          return _this10._customControls.get(field);
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

  }, {
    key: '_disableSubmit',
    get: function get() {
      return false;
    }

    /**
     * List of validityTypes, as defined in the HTML5 standard.
     * @return {Array} - The list of strings of validity types.
     */

  }, {
    key: '_validityTypes',
    get: function get() {
      return ["valueMissing", "typeMismatch", "tooShort", "tooLong", "patternMismatch", "badInput", "stepMismatch", "rangeOverflow", "rangeUnderflow"];
    }
    /**
     * Some input types should be ignored by default.
     * @return {array} - Array of ignored input types.
     */

  }, {
    key: '_ignoredTypes',
    get: function get() {
      return ['field', 'submit', 'button', 'reset'];
    }
    /**
     * Class name for error messages.
     * @return {String} - class name.
     */

  }, {
    key: '_errorClass',
    get: function get() {
      return 'error-message';
    }
    /**
     * Class name for fields in invalid state.
     * @return {String} - class name
     */

  }, {
    key: '_fieldErrorClass',
    get: function get() {
      return 'error';
    }
    /**
     * Class name for labels associated with fields in error state.
     * @return {String} - class name.
     */

  }, {
    key: '_labelErrorClass',
    get: function get() {
      return this._fieldErrorClass + '-label';
    }
  }, {
    key: '_submissionButton',
    get: function get() {
      var activeElement = document.activeElement;
      if (activeElement && activeElement.form === this._form) {
        return activeElement;
      }
      return null;
    }
  }]);

  return _class;
}(HTMLElement);

exports.default = _class;

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for custom form control elements.§
 * @module  src/CustomFormControl
 * @moduledesc
 * This is a base for custom form controls, meaning custom elements wrapping
 * an HTML form field or some other similar custom construction that can 
 * be validated.
 *
 * It is expected that custom elements derived from this will have a parent 
 * element based on the CustomForm class, wrapping a normal `<form>`.
 *
 * By default, custom form controls can have attributes mapping to text for
 * custom validation messages, as DOM attributes on the custom
 * element itself. The names of these are lowercase variants of the standardized
 * validity types (`valueMissing`, `patternMismatch` etc).
 *
 * Example for when the required attribute is used (mapping to `valueMissing`): 
 * 
 * ```
 * <custom-control valuemissing="You must fill in this value, mate.">
 *   <input required>
 * </custom-control>
 * ```
 * This file does not define a custom element name: you must do that yourself,
 * e.g:
 * 
 * ```
 * import {CustomFormControl} from 'custom-dash-forms';
 * window.customElements.define('my-custom-formcontrol', CustomFormControl);
 * ```
 *
 * If you need different functionality, you can extend this class and 
 * override any methods you like. For example, if you’d like to wholesale translate
 * error messages, you can override the method for getting the custom error message
 * which then looks up the validityType in an object.
 *
 * Another example is if you build a wholly custom validation, which should then
 * override the `_validity` getter (and other methods you need to override.)
 *
 * By default, the `_validity` getter just delegates to the native validation,
 * via the parent CustomForm.
 * @extends HTMLElement
 */
var _class = function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      // Since we do not know if required child elements
      // are present when the element is upgraded 
      // (see e.g https://github.com/w3c/webcomponents/issues/551),
      // run an initialization loop until all is well.
      if (!this._isInitialized) {
        window.requestAnimationFrame(function () {
          return _this2._init();
        });
      }
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      if (!this._field) {
        // DOM not ready: try again.
        window.requestAnimationFrame(function () {
          return _this3._init();
        });
        return;
      }
      this._registerAsCustomControl();
      this._isInitialized = true;
    }
    /**
     * Flag for async field - default implementation checks for `async` attribute.
     * @return {Boolean} - true if attribute async is present on custom element.
     */

  }, {
    key: '_asyncHasError',
    value: function _asyncHasError() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
          resolve([_this4, 'Async!']);
        }, 1000);
      });
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

  }, {
    key: '_getCustomMessage',
    value: function _getCustomMessage(validityType) {
      var attrName = validityType.toLowerCase();
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

  }, {
    key: '_showError',
    value: function _showError(error) {
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

  }, {
    key: '_removeError',
    value: function _removeError(field) {
      if (this._customForm) {
        this._customForm._removeError(this._field, field);
      }
    }
    /**
     * Focus the field programmatically.
     */

  }, {
    key: '_focus',
    value: function _focus() {
      this._field.focus();
    }
    /**
     * Use a custom Event to signal a parent CustomForm that there is a
     * new form control.
     * @return {void}
     */

  }, {
    key: '_registerAsCustomControl',
    value: function _registerAsCustomControl() {
      // Create a custom DOM event, allow it to bubble.
      var event = new CustomEvent('customdashform:registercontrol', {
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

  }, {
    key: '_setCustomForm',
    value: function _setCustomForm(element) {
      this._customForm = element;
    }
  }, {
    key: '_isAsync',
    get: function get() {
      return this.hasAttribute('async');
    }

    /**
     * Getter for the field validity of the field inside this control wrapper.
     * @return {Object} Validity Object
     */

  }, {
    key: '_validity',
    get: function get() {
      return this._field.validity;
    }

    /**
     * Get disabled status of field
     */

  }, {
    key: '_disabled',
    get: function get() {
      return this._field.disabled;
    }
    /**
     * Set disabled status
     * @param  {boolean} onoff - status of disabled property of the inner field.
     */
    ,
    set: function set(onoff) {
      this._field.disabled = !!onoff;
    }

    /**
     * Getter for the HTML form field inside this control wrapper. You will need
     * to override this if you create a custom form control for types of controls
     * having multiple elements in a group, e.g. checkboxes and radio buttons.
     * @return {Element} Input, Select or Textarea.
     */

  }, {
    key: '_field',
    get: function get() {
      return this.querySelector('input, select, textarea') || null;
    }
    /**
     * Getter for the plain HTML <form> of the field.
     * @return {Element} HTMLFormElement
     */

  }, {
    key: '_form',
    get: function get() {
      return this._field.form;
    }
    /**
     * Getter for validityTypes custom to this field - default is false.
     * Override this to have fields with their own validity types.
     * @return {Arrau} An array of validityType strings.
     */

  }, {
    key: '_validityTypes',
    get: function get() {
      return [];
    }
  }]);

  return _class;
}(HTMLElement);

exports.default = _class;

/***/ })

/******/ });
//# sourceMappingURL=customdashform.js.map