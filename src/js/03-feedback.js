import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

let savedData = {};

function onBtnSubmit(e) {
    e.preventDefault();
    
    const { email, message } = e.currentTarget;

    if (email.value === '' || message.value === '') {
        return alert('Поля мають бути заповнені!');
    }

    const data = {
        email: email.value,
        message: message.value,
    }

    console.log(data);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}


formEl.addEventListener('input', throttle(saveData, 500));
populateForm();
formEl.addEventListener('submit', onBtnSubmit);

function saveData(e) {

  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
  } else {
    savedData = {};
  }
  savedData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function populateForm() {
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
    formEl.elements.message.value = savedData.message ? savedData.message : '';
    formEl.elements.email.value = savedData.email ? savedData.email : '';
  }
}
