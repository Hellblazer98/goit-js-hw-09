import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const KEY_STORAGE = 'videoplayer-current-time';

const player = new Player(iframe);

console.log(player)

player.on('timeupdate', throttle(onSaveTime, 1000));

function onSaveTime(currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem(KEY_STORAGE, JSON.stringify(seconds));
}


function playOnSavedTime() {
    const time = JSON.parse(localStorage.getItem(KEY_STORAGE));

    if (time) {
        player.setCurrentTime(time);
    }
}




