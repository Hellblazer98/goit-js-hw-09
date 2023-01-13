import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let endDate = null;
let timerId = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        endDate = selectedDates[0];
        if (selectedDates[0] <= new Date()) {
            refs.btnStart.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            refs.btnStart.disabled = false;
            console.log(selectedDates[0]);
      }
  },
};

const fp = flatpickr(refs.datePicker, options);
refs.btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
    refs.datePicker.disabled = true;
     timerId = setInterval(() => {
        refs.btnStart.disabled = true;
        let dateDiff = endDate - new Date();
        
        if (dateDiff >= 0) {
            let time = convertMs(dateDiff);
            refs.days.textContent = time.days;
            refs.hours.textContent = time.hours;
            refs.minutes.textContent = time.minutes;
            refs.seconds.textContent = time.seconds;
        } else {
            Notiflix.Notify.success('Finished!');
            clearInterval(timerId);
        }
    }, 1000)
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
