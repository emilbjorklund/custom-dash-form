# What’s all this then?

This is an experiment in using the native validation in HTML5, while still retaining
control over error messages and their rendering. It is also an excercise in building
custom elements (rather than full web components) and using ES6 and other modern
JS syntax.

## Beware!!
**This is by no means production ready at this point. It's pretty much a loose idea more than finished lib.**
It just barely works with a concoction of polyfills locally on my machine, plus in
Chrome Canary without.

## Background
Much of the ideas (and some nicked code) comes from [Chris Ferdinandi’s validate library](https://github.com/cferdinandi/validate), 
and the ideas therein, as presented in his [series of CSS-Tricks posts](https://css-tricks.com/form-validation-part-1-constraint-validation-html/).

Initially, I had the idea from PPKs talk on [constraint validation at CSSDay 2017](https://cssday.nl/2017/programme#peter-paul-koch),
thought ”hold on, one could build a library to smooth over some of this”, then stumbled upon
Chris’ article. I also thought that one could use the native validation messages, rather than
always supply a list of your own messages, if you didn’t want to translate them into your language
etc.

## Why custom elements? And which custom elements?

Custom elements allow for some nice management of lifecycle events for DOM stuff.
When a new element is added, it is automatically enhanced with behavior (of itself and/or its children).
Likewise, it can easily clean up after itself when removed from the DOM, when moved to another 
document, or when attributes change.

Personally, I kind of like the API of just wrapping the relevant parts of the DOM with
custom elements, and then voilá, cool behavior. It’s pretty much the same as wrapping 
stuff in a `<div class="mything">` (or `<div data-component="mything">`, just much more explicit.

## So, what does it look like when used?

In your JS, use the custom element like so (hypothetically):

(I’m purposefully ignoring the handful of polyfills you’ll need, because this is
all exploratory.)

```js
import {CustomForm} from 'custom-dash-form';

window.customElements.define('custom-form', CustomForm);
```

Take this:

```html
<form>
  <label for="myinput">My input</label>
  <input type="text" id="myinput" require name="myinput">
</form>
```

…wrap it in `custom-form` like so:

```html
<custom-form>
  <form>
    <div class="form-control">
      <label for="myinput">My input</label>
      <input type="text" id="myinput" require name="myinput">
    </div>
    <button>Submit</button>
  </form>
</custom-form>
```
…and now you have a form where you can control the timing, rendering and wording of 
validation messages.

Even better when you use the custom child element for form controls:

```js
import {CustomForm, CustomFormControl} from 'custom-dash-form';

window.customElements.define('custom-form', CustomForm);
window.customElements.define('custom-form-control', CustomFormControl);
```

Now you can wrap individual form controls in the `custom-form-control` element,
and control even more of their behavior. Error messages can be set with attributes
corresponding to lowercase representations of the `validitystate` keys:

```html
<custom-form>
<form>
  <div class="form-control">
    <label for="myinput">My input</label>
    <input type="text" id="myinput" require name="myinput">
  </div>
  <custom-formcontrol class="form-control" valuemissing="Hallå, du måste skriva en siffra." stepmismatch="Måste vara ett jämnt tal!">
    <label for="custom-field-number">Custom required number input</label>
    <input type="number" required min="0" max="10" step="2" value="3" id="custom-field-number">
  </custom-formcontrol>
  <button>Submit</button>
</form>

</form>
```

Here, the validation messsages for `valueMissing` and `stepMismatch` are overridden
by translated local ones.

## Extension

My hope (and my predicion) is that it will be easy to extend the `prototype` of
the original `CustomForm` to override any parts you would want to work differently.

It will hopefully be even easier to write your own extensions to `CustomFormControl`,
for e.g. remote validation, file validation, required number of boxes checked etc.
These will hopefully be only a few lines of code.

Mostly, this depends on a rewrite of the validation procedures to be fully async
which is currently in the works.

## File sizes

The custom element for the form itself is probably around 5Kb or so when minified 
and gzipped, so it's not massive. With all polyfills, it tends to be… scary.

That said, at some point, quite a few less polyfills are needed, at which point this
will be a very small library indeed, even with a whole bunch of custom fields.

Ta!


