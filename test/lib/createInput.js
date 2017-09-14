/**
 * Helper script to create an input element. Pass in an object with
 * attributes to set them on the input, e.g.
 * { required: '', name: 'foo'}
 * 
 * Pass in a parent container (field wrapper or <form> etc) to append the 
 * element to it directly.
 *
 * Pass in a label text _and_ a container to create a label element with the
 * correct [for] attribute.
 */

const uuid = require('uuid/v4');

module.exports = function (attrs, container, label) {
  const inp = document.createElement('input');
  const labelEl = null;
  if (typeof attrs === 'object') {
    for (const [name, value] of Object.entries(attrs)) {
      inp.setAttribute(name, value);
    }
  }
  if (!inp.id) {
    inp.id = uuid();
  }
  if (container && label) {
    labelEl = document.createElement('label');
    labelEl.innerHTML = label;
    labelEl.setAttribute('for', inp.id);
    container.appendChild(labelEl);
  }
  if (container) {
    container.appendChild(inp);
  }
  return inp;
};