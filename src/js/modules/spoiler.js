export default class Spoiler {
	constructor (btnSelector) {
		this.btns = document.querySelectorAll(btnSelector);
	}

	_bindTriggers() {
		this.btns.forEach(btn => {
			btn.querySelector('.plus').addEventListener('click', () => {
				const msg = btn.nextElementSibling;

				if (getComputedStyle(msg).display === 'none') {
					msg.classList.add('animated', 'fadeInUp');
					msg.style.display = 'block';
				} else {
					msg.classList.remove('animated', 'fadeInUp');
					msg.style.display = 'none';
				}
			});
		});
	}

	init() {
		this._bindTriggers();
	}
}