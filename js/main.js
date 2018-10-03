import { openMenu } from './menu.js';
import { slidePage } from './pageNavigation.js';

const page = document.querySelector('.page');

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('.burger').addEventListener('click', openMenu);

    document.querySelectorAll('.page-navigation__link').forEach(el =>
        el.addEventListener('click', slidePage));

    if (localStorage.getItem('page') && localStorage.getItem('page') !== 'index') {
        page.classList.add(`page_slideIn-${localStorage.getItem('side')}`);
        localStorage.removeItem('side');
        localStorage.removeItem('page');
    }

    page.classList.add('page_visible');
});