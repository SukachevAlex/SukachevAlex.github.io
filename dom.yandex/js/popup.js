import { insideTemperature, floorTemperature, getSign } from './main.js';

const popupTab = document.querySelector('.popup__tab-area');
const tabItems = {
    'bulb': ['Вручную', 'Дневной свет', 'Вечерний свет', 'Рассвет'],
    'camera': [],
    'hall': ['Включено', 'Холодно', 'Тепло', 'Жарко'],
    'kitchen': []
};

export function setPopup() {

    document.querySelector('.page').classList.add('page_blur');
    document.querySelector('.popup__overlay').classList.add('popup__overlay_visible');
    document.querySelector('.popup__name').innerHTML = this.querySelector('.device__name').innerHTML;
    document.querySelector('.popup__icon').className = `popup__icon device__icon ${this.querySelector('.device__icon').className.split(' ')[1]}`;
    document.querySelector('.popup__schedule').innerHTML = this.querySelector('.device__schedule').innerHTML;

    setTemperature(this);
    generateTabs(this);

    document.querySelector('.popup__controller-area').innerHTML = generateController(this.dataset.type);
}

function setTemperature(element) {
    let temperature;
    element.dataset.type === 'hall' ? temperature = insideTemperature :
        element.dataset.type === 'kitchen' ? temperature = floorTemperature : temperature = undefined;
    temperature ? document.querySelector('.popup__temperature-value').innerHTML = getSign(temperature) :
        document.querySelector('.popup__temperature-value').innerHTML = '';
}

function generateTabs(element) {

    popupTab.innerHTML = '';
    if (tabItems[element.dataset.type].length && !popupTab.children.length) {
        tabItems[element.dataset.type].forEach((el, index) => {
            let item = document.createElement('div');
            item.className = `popup__tab-item ${!index ? 'popup__tab-item_active' : ''}`;
            item.innerHTML = el;
            popupTab.appendChild(item);
        })
    }

    let popupTabs = document.querySelectorAll('.popup__tab-item');
    popupTabs.forEach(el => el.addEventListener('click', function() {
        popupTabs.forEach(el => el.classList.remove('popup__tab-item_active'));
        this.classList.add('popup__tab-item_active');
    }));
}

function generateController(type) {
    return type === 'hall' || type === 'bulb' ? `
        <div class="popup__controller">
            <input class="popup__slider popup__slider_${type === 'hall' ? 'temperature min="-10" max="30"' : 'light min="0" max="100"'}" type="range"  step="1" onchange="">
            
            ${type === 'hall' ? 
                '<div class="popup__value popup__value_min">-10</div><div class="popup__value popup__value_max">+30</div>' : 
                '<div class="controller__icon controller__icon-min device__icon_sun-inactive"></div><div class="controller__icon controller__icon-max device__icon_sun-inactive"></div>'
            }
        </div> 
    ` :
        `<div class="popup__controller">
            <object
                class="popup__circle-slider"
                type="image/svg+xml"
                data="img/svg/controller.svg">
                    <img class="popup__circle-slider " src="img/svg/controller.svg">
                </object>
                </div>`;

}