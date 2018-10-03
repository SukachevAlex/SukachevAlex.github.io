export function openMenu() {
    this.classList.toggle('burger_close');
    this.classList.toggle('burger_open');
    document.querySelector('.page-main').classList.toggle('page-main_hidden');
    document.querySelector('.header__nav').classList.toggle('header__nav_visible');
}