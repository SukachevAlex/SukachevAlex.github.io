export function slidePage(event) {
    let side = Boolean(this.querySelector('.page-navigation__arrow_left'));

    localStorage.setItem('page', this.getAttribute('href'));
    localStorage.setItem('side', `${side ? 'left' : 'right'}`);

    event.preventDefault();
    document.querySelector('.page').classList.add(`page_slideOut-${side ? 'right' : 'left' }`);
    setTimeout(redirect, 350);
}

export function redirect() {
    document.querySelector('.page').classList.remove('page_visible');
    window.location = localStorage.getItem('page');
}