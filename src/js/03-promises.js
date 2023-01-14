import Notiflix from "notiflix";

const form = document.querySelector('.form');
const formRefs = {
  delay: form.elements.delay,
  step: form.elements.step,
  amount: form.elements.amount,
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  })

  return promise;
}

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const { delay, step, amount } = formRefs;

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i+1, Number(delay.value) + i * Number(step.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
