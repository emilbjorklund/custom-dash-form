import CustomForm from '../index'
import assert from 'assert';
import singleTextFieldForm from './fixtures/singleTextField';

function simulatedSubmit(form) {
  return new Event('submit', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
}

window.customElements.define('my-form', CustomForm);

const element = document.createElement('my-form');

element.innerHTML = singleTextFieldForm;

document.body.appendChild(element);

function waitForCondition(check, maxTicks, currentTick) {
  let max = maxTicks || 60;
  let tick = currentTick || 0;
  if (check()) {
    return Promise.resolve();
  } else {
    if (tick >= max) {
      return Promise.reject('Took too long');
    }
    return new Promise((res, rej) => {
      window.requestAnimationFrame(()=>{
        resolve(waitForCondition(check, max, tick++));
      });
    })
  }
}

describe('CustomForm', function() {
  it('should be an object', ()=>{
    assert.equal(typeof CustomForm, 'function');
  });
});

describe('<my-form>', ()=>{
  describe('prototype', ()=>{
    it('should have an init method', ()=>{
      assert.equal('_init' in element, true);
    });

    it('should have a connectedCallback method', ()=>{
      assert.equal('connectedCallback' in element, true);
    });
  });
  describe('markup', (testDone)=>{
    it('should set novalidate on form on initialization', ()=>{
      waitForCondition(()=>element._isInitialized).then(()=>{
        assert.equal(element._form.hasAttribute('novalidate'), true);
        testDone();
      });
    });
    it('should render the native error message on submit', (testDone)=>{
      var nativeMessage, error, errorMessage;
      waitForCondition(()=>element._isInitialized).then((resolve, reject) => {
        console.log('is initialized');
        nativeMessage = element.querySelector('input').validationMessage;
        let event = simulatedSubmit(element._form);
        element._submitHandler(event);
        console.log(element.querySelector(`.${element._errorClass}`));
        return waitForCondition(()=>element.querySelector(`.${element._errorClass}`), 10);
      }, 10).then((resolve, reject)=>{
        error = element.querySelector(`.${element._errorClass}`);
        errorMessage = error.innerText;
        assert.equal(errorMessage, nativeMessage);
        testDone();
        resolve();
      });
    });
  });
});