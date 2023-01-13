import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const KEY_STORAGE = "feedback-form-state";

populateInput();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(KEY_STORAGE);
}



function onFormInput(event) {
    let userFeedback = localStorage.getItem(KEY_STORAGE);
    userFeedback = userFeedback ? JSON.parse(userFeedback) : {};
    userFeedback[event.target.name] = event.target.value;
    localStorage.setItem(KEY_STORAGE, JSON.stringify(userFeedback));

    console.log(userFeedback);
}

function populateInput() {
    let savedData = localStorage.getItem(KEY_STORAGE);

    if (savedData) {
        try {
        savedData = JSON.parse(savedData);
        Object.entries(savedData).forEach(([name, value]) => {
            form.elements[name].value = value;
        })
        } catch (err) {
            console.error('Error: invalid saved form state in LocalStorage.' + KEY_STORAGE);
            console.error(err);
        }
    }

    console.log(savedData);

}

