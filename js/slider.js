Siema.prototype.addArrows = function() {

    this.prevArrow = document.createElement('div');
    this.nextArrow = document.createElement('div');
    this.prevArrow.classList.add('slider__arrow', 'slider__arrow_left');
    this.nextArrow.classList.add('slider__arrow', 'slider__arrow_right');
    this.selector.appendChild(this.prevArrow)
    this.selector.appendChild(this.nextArrow)

    this.prevArrow.addEventListener('click', () => this.prev());
    this.nextArrow.addEventListener('click', () => this.next());
}

const siema = new Siema({
    selector: '.slider',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: false,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
});

siema.addArrows();