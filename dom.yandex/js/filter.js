const formDevices = document.querySelectorAll('.form_devices__device');
const filterTabs = document.querySelectorAll('.filter__name');

export function filterDevices() {
    if (this.id === 'filter_all') {
        formDevices.forEach(el => el.classList.add('device_visible'));
    } else {
        filterTabs.forEach(el => el.classList.toggle('filter__name_visible'));
        formDevices.forEach(
            el => `filter_${el.dataset.type}` === this.id ?
            el.classList.add('device_visible') :
            el.classList.remove('device_visible')
        );
    }
    filterTabs.forEach(el => el.classList.remove('filter__name_active'));

    this.classList.add('filter__name_active');
}