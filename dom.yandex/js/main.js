import { filterDevices } from './filter.js';
import { setPopup } from './popup.js';

export { insideTemperature, floorTemperature, getSign };

const filterTabs = document.querySelectorAll('.filter__name');
const devices = document.querySelectorAll('.device');
const popupBtns = document.querySelectorAll('.btn__popup');

let insideTemperature = 23;
let outsideTemperature = 19;
let floorTemperature = 23;



document.addEventListener("DOMContentLoaded", function(event) {

    document.querySelector('.panel__temperature-value_inside').innerHTML = getSign(insideTemperature);
    document.querySelector('.panel__temperature-value_outside').innerHTML = getSign(outsideTemperature);

    filterTabs.forEach(el => el.addEventListener('click', filterDevices));
    devices.forEach(el => el.addEventListener('click', setPopup));
    popupBtns.forEach(el => el.addEventListener('click', function() {
        document.querySelector('.page').classList.remove('page_blur');
        document.querySelector('.popup__overlay').classList.remove('popup__overlay_visible');
    }));

    document.querySelector('.menu__link').addEventListener('click', function() {
        document.querySelector('.slide-menu').classList.toggle('slide-menu_visible');
        document.querySelector('.page').classList.toggle('page_slide-right')
    });

    document.getElementById('filter_all').addEventListener('click', function() {
        filterTabs.forEach(el => el.classList.toggle('filter__name_visible'));
    });

});

function getSign(num) {
    return num > 0 ? `+${num}` : num;
}