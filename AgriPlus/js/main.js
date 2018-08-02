const galleryImage = document.querySelector('.gallery-item__image');
const galleryTitle = document.querySelector('.gallery-item__title');
const gallerySubTitle = document.querySelector('.gallery-item__sub-title');
const navigateButton = document.querySelector('.button__navigate');

document.querySelector('.header-page').style.height = `${window.innerHeight}px`;

const handleClick = (e) => {
    let element = e.currentTarget.querySelector('.thumbnail__image');
    galleryImage.style.backgroundImage = `url('${element.src.replace('_thumb', '')}')`;
    galleryTitle.innerHTML = element.alt;
    gallerySubTitle.innerHTML = element.dataset.sub;
}

function init() {
    // Создание карты.    
    var myMap = new ymaps.Map("footer__map", {
            center: [41.877786, -87.656995],
            zoom: 15,
            controls: []
        }, {
            suppressMapOpenBlock: true,
            type: 'yandex#hybrid',
            enBlock: true
        }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});

    myMap.geoObjects
        .add(myPlacemark);
}

function scroll() {
    if (document.documentElement.scrollTop > window.innerHeight / 2) {
        navigateButton.style.opacity = 1;
    } else {
        navigateButton.style.opacity = 0;
    }
}

function navigateTop() {
    if (document.documentElement.scrollTop > 0) {
        window.scrollBy(0, -100);
        t = setTimeout('navigateTop()', 25);
    } else {
        clearTimeout(t);
    }
}

window.onload = function() {
    let thumbs = document.querySelectorAll('.thumbnail__item');
    thumbs.forEach(el => el.addEventListener('click', handleClick));

    ymaps.ready(init);
};

window.onscroll = function() {
    scroll();
}