import CustomForm from '../index'
import chai from 'chai';
//import chaiAsPromised from 'chai-as-promised';
import singleTextFieldForm from './fixtures/singleTextField';
import waitForCondition from '../../../../test/lib/waitForCondition';

//chai.use(chaiAsPromised);

const assert = chai.assert;

function simulatedSubmit(form) {
  return new Event('submit', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
}
// TODO: fix up test independence in a beforeEach etc
window.customElements.define('my-form', CustomForm);

const element = document.createElement('my-form');

element.innerHTML = singleTextFieldForm;

document.body.appendChild(element);

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

  describe('_shouldNotValidate', () => {
    it('should return true for disabled fields', ()=>{
      let field = document.createElement('input');
      field.disabled = true;
      assert.equal(element._shouldNotValidate(field), true);
    });
    it('should return true for certain input types', ()=>{
      let fileinput = document.createElement('input');
      fileinput.type = 'file';
      let btninput = document.createElement('input');
      btninput.type = 'button';
      let resetinput = document.createElement('input');
      resetinput.type = 'reset';
      let submitinput = document.createElement('input');
      submitinput.type = 'submit';
      assert.equal(element._shouldNotValidate(fileinput), true);
      assert.equal(element._shouldNotValidate(btninput), true);
      assert.equal(element._shouldNotValidate(resetinput), true);
      assert.equal(element._shouldNotValidate(submitinput), true);
    });
  });

  describe('markup', (done)=>{

    it('should set novalidate on form on initialization', (done)=>{
      waitForCondition(()=>element._isInitialized).then((resolve, reject)=>{
        assert.equal(element._form.hasAttribute('novalidate'), true);
        done();
      }).catch((error)=>{
        //throw new Error(error);
        done(error);
      });
    });

    it('should render the native error message on submit', (done) => {
      var nativeMessage, error, errorMessage;

      waitForCondition(()=>element._isInitialized).then(() => {
        nativeMessage = element.querySelector('input').validationMessage;
        element._form.dispatchEvent(simulatedSubmit(element._form));
        return waitForCondition(
            ()=>element.querySelector(`.${element._errorClass}`),
          );
      }).then(() => {
        error = element.querySelector(`.${element._errorClass}`);
        errorMessage = error.innerText;
        assert.equal(errorMessage, nativeMessage);
        done();
      }).catch((error)=>{
        done(error);
      });
    });

    it('should render the native error message on blur', (done) => {
      var input, nativeMessage, error, errorMessage;

      waitForCondition(()=>element._isInitialized).then(() => {
        input = element.querySelector('input')
        nativeMessage = input.validationMessage;
        input.dispatchEvent(new Event('blur', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        }));
        return waitForCondition(
            ()=>element.querySelector(`.${element._errorClass}`),
          );
      }).then(() => {
        error = element.querySelector(`.${element._errorClass}`);
        errorMessage = error.innerText;
        assert.equal(errorMessage, nativeMessage);
        done();
      }).catch((error)=>{
        done(error);
      });
    });
  });
});