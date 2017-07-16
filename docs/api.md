## Modules

<dl>
<dt><a href="#module_src/CustomForm">src/CustomForm</a></dt>
<dd></dd>
<dt><a href="#module_src/CustomFormControl">src/CustomFormControl</a> ⇐ <code>HTMLElement</code></dt>
<dd><p>Class for custom form control elements.§</p>
</dd>
</dl>

<a name="module_src/CustomForm"></a>

## src/CustomForm

* [src/CustomForm](#module_src/CustomForm)
    * [module.exports](#exp_module_src/CustomForm--module.exports) ⇐ <code>HTMLElement</code> ⏏
        * [._fields](#module_src/CustomForm--module.exports+_fields) ⇒ <code>Array</code>
        * [._disableSubmit](#module_src/CustomForm--module.exports+_disableSubmit) ⇒ <code>Boolean</code>
        * [._validityTypes](#module_src/CustomForm--module.exports+_validityTypes) ⇒ <code>Array</code>
        * [._ignoredTypes](#module_src/CustomForm--module.exports+_ignoredTypes) ⇒ <code>array</code>
        * [._errorClass](#module_src/CustomForm--module.exports+_errorClass) ⇒ <code>String</code>
        * [._fieldErrorClass](#module_src/CustomForm--module.exports+_fieldErrorClass) ⇒ <code>String</code>
        * [._labelErrorClass](#module_src/CustomForm--module.exports+_labelErrorClass) ⇒ <code>String</code>
        * [._submissionButton](#module_src/CustomForm--module.exports+_submissionButton) ⇒ <code>Element</code> \| <code>null</code>
        * [.connectedCallback()](#module_src/CustomForm--module.exports+connectedCallback)
        * [._init()](#module_src/CustomForm--module.exports+_init)
        * [._destroy()](#module_src/CustomForm--module.exports+_destroy)
        * [.disconnectedCallback()](#module_src/CustomForm--module.exports+disconnectedCallback)
        * [._onregisterCustomControl(event)](#module_src/CustomForm--module.exports+_onregisterCustomControl)
        * [._determineMessage(field, validityType)](#module_src/CustomForm--module.exports+_determineMessage) ⇒ <code>String</code>
        * [._onSubmit(form, fields)](#module_src/CustomForm--module.exports+_onSubmit)
        * [._getFieldLabel(field)](#module_src/CustomForm--module.exports+_getFieldLabel) ⇒ <code>Element</code> \| <code>null</code>
        * [._createErrorMessage(field, error)](#module_src/CustomForm--module.exports+_createErrorMessage) ⇒ <code>Element</code>
        * [._revealErrorMessage(message)](#module_src/CustomForm--module.exports+_revealErrorMessage)
        * [._showError(field, error)](#module_src/CustomForm--module.exports+_showError)
        * [._removeError(field)](#module_src/CustomForm--module.exports+_removeError)
        * [._shouldNotValidate()](#module_src/CustomForm--module.exports+_shouldNotValidate)
        * [._submittedWithFormnovalidate()](#module_src/CustomForm--module.exports+_submittedWithFormnovalidate) ⇒ <code>boolean</code>
        * [._hasError(field)](#module_src/CustomForm--module.exports+_hasError) ⇒ <code>String</code> \| <code>void</code>
        * [._blurHandler(event)](#module_src/CustomForm--module.exports+_blurHandler)
        * [._submitHandler(event)](#module_src/CustomForm--module.exports+_submitHandler)

<a name="exp_module_src/CustomForm--module.exports"></a>

### module.exports ⇐ <code>HTMLElement</code> ⏏
Class for custom form wrapper elements.

**Kind**: Exported class  
**Extends**: <code>HTMLElement</code>  
<a name="module_src/CustomForm--module.exports+_fields"></a>

#### module.exports._fields ⇒ <code>Array</code>
Getter for a list of fields/form controls.
These can be either straight up HTML form fields OR
custom controls.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>Array</code> - - A list of fields, custom or native.  
<a name="module_src/CustomForm--module.exports+_disableSubmit"></a>

#### module.exports._disableSubmit ⇒ <code>Boolean</code>
Determines if the submit event of the <form> should be prevented after
processing validation.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+_validityTypes"></a>

#### module.exports._validityTypes ⇒ <code>Array</code>
List of validityTypes, as defined in the HTML5 standard.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>Array</code> - - The list of strings of validity types.  
<a name="module_src/CustomForm--module.exports+_ignoredTypes"></a>

#### module.exports._ignoredTypes ⇒ <code>array</code>
Some input types should be ignored by default.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>array</code> - - Array of ignored input types.  
<a name="module_src/CustomForm--module.exports+_errorClass"></a>

#### module.exports._errorClass ⇒ <code>String</code>
Class name for error messages.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>String</code> - - class name.  
<a name="module_src/CustomForm--module.exports+_fieldErrorClass"></a>

#### module.exports._fieldErrorClass ⇒ <code>String</code>
Class name for fields in invalid state.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>String</code> - - class name  
<a name="module_src/CustomForm--module.exports+_labelErrorClass"></a>

#### module.exports._labelErrorClass ⇒ <code>String</code>
Class name for labels associated with fields in error state.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>String</code> - - class name.  
<a name="module_src/CustomForm--module.exports+_submissionButton"></a>

#### module.exports._submissionButton ⇒ <code>Element</code> \| <code>null</code>
Getter for the active button, after a submission is made.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>Element</code> \| <code>null</code> - - The element, or null if missing.  
<a name="module_src/CustomForm--module.exports+connectedCallback"></a>

#### module.exports.connectedCallback()
Custom element reaction when element is connected to the DOM.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+_init"></a>

#### module.exports._init()
Initialize the custom element, if the form exists. Otherwise, try again
later.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+_destroy"></a>

#### module.exports._destroy()
Shortcut to programmatically disconnect, if needed.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+disconnectedCallback"></a>

#### module.exports.disconnectedCallback()
Custom element reaction for when the element is disconnected from the DOM.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+_onregisterCustomControl"></a>

#### module.exports._onregisterCustomControl(event)
Handler for when custom child controls send and event for registering as
part of the form.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | the custom event triggered. |

<a name="module_src/CustomForm--module.exports+_determineMessage"></a>

#### module.exports._determineMessage(field, validityType) ⇒ <code>String</code>
Figures out what the error message is for a particular form control.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>String</code> - - the error message  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | the HTML native form field or custom form control. |
| validityType | <code>String</code> | the validityType string, usually from native API. |

<a name="module_src/CustomForm--module.exports+_onSubmit"></a>

#### module.exports._onSubmit(form, fields)
Placeholder callback after successful validation, to override
when extending.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>Element</code> | The <form> itself. |
| fields | <code>Array</code> | An array of fields. |

<a name="module_src/CustomForm--module.exports+_getFieldLabel"></a>

#### module.exports._getFieldLabel(field) ⇒ <code>Element</code> \| <code>null</code>
Gets the <label> element of a native form field.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>Element</code> \| <code>null</code> - - The <label> element of the element, or null if none exists.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | the native HTML form field |

<a name="module_src/CustomForm--module.exports+_createErrorMessage"></a>

#### module.exports._createErrorMessage(field, error) ⇒ <code>Element</code>
Creates an error element based on the field and message.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>Element</code> - - The constructed error message element.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | The html form field |
| error | <code>string</code> | The error message |

<a name="module_src/CustomForm--module.exports+_revealErrorMessage"></a>

#### module.exports._revealErrorMessage(message)
Reveal the error message, i.e. making it (re-)render in the DOM.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Element</code> | The error message DOM element. |

<a name="module_src/CustomForm--module.exports+_showError"></a>

#### module.exports._showError(field, error)
Initiate the chain of events that end up showing a certain error message.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | The HTML form field that the error pertains to. |
| error | <code>String</code> | The error message |

<a name="module_src/CustomForm--module.exports+_removeError"></a>

#### module.exports._removeError(field)
Remove all traces of the error message / state from a field.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | The HTML form field in question. |

<a name="module_src/CustomForm--module.exports+_shouldNotValidate"></a>

#### module.exports._shouldNotValidate()
Some types of fields should be ignored in terms of validity:
1. Disabled form controls
2. Descendants of disabled fieldsets
3. Particular field types

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
<a name="module_src/CustomForm--module.exports+_submittedWithFormnovalidate"></a>

#### module.exports._submittedWithFormnovalidate() ⇒ <code>boolean</code>
Check if the form was submitted by a button with `formnovalidate` set.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>boolean</code> - - If the submit field had formnovalidate set.  
<a name="module_src/CustomForm--module.exports+_hasError"></a>

#### module.exports._hasError(field) ⇒ <code>String</code> \| <code>void</code>
Validates a field and returns its error message if invalid.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  
**Returns**: <code>String</code> \| <code>void</code> - - String if invalid, void else.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Element</code> | the html form field or custom control element. |

<a name="module_src/CustomForm--module.exports+_blurHandler"></a>

#### module.exports._blurHandler(event)
Event handler for when a field is blurred. Validates the field in isolation.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | the event object |

<a name="module_src/CustomForm--module.exports+_submitHandler"></a>

#### module.exports._submitHandler(event)
Listen to the submit event of the HTMLFormElement inside the custom form
validate all fields at that time, focus the first invalid field

**Kind**: instance method of [<code>module.exports</code>](#exp_module_src/CustomForm--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The submit event object. |

<a name="module_src/CustomFormControl"></a>

## src/CustomFormControl ⇐ <code>HTMLElement</code>
Class for custom form control elements.§

**Extends**: <code>HTMLElement</code>  
**Moduledesc**: This is a base for custom form controls, meaning custom elements wrapping
an HTML form field or some other similar custom construction that can 
be validated.

It is expected that custom elements derived from this will have a parent 
element based on the CustomForm class, wrapping a normal `<form>`.

By default, custom form controls can have attributes mapping to text for
custom validation messages, as DOM attributes on the custom
element itself. The names of these are lowercase variants of the standardized
validity types (`valueMissing`, `patternMismatch` etc).

Example for when the required attribute is used (mapping to `valueMissing`): 

```
<custom-control valuemissing="You must fill in this value, mate.">
  <input required>
</custom-control>
```
This file does not define a custom element name: you must do that yourself,
e.g:

```
import {CustomFormControl} from 'custom-dash-forms';
window.customElements.define('my-custom-formcontrol', CustomFormControl);
```

If you need different functionality, you can extend this class and 
override any methods you like. For example, if you’d like to wholesale translate
error messages, you can override the method for getting the custom error message
which then looks up the validityType in an object.

Another example is if you build a wholly custom validation, which should then
override the `_validity` getter (and other methods you need to override.)

By default, the `_validity` getter just delegates to the native validation,
via the parent CustomForm.  
