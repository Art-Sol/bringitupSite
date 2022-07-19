export default class Diferences {
	constructor(blockSelector, itemsSelector) {
		this.block = document.querySelector(blockSelector);
		try { this.items = this.block.querySelectorAll(itemsSelector); } catch (e) {}
		this.counter = 0;
	}

	_bindTriggers() {
		this.block.querySelector('.plus').addEventListener('click', () => {
			if (this.counter < this.items.length - 2) {
				this.items[this.counter].style.display = 'flex';
				this.items[this.counter].classList.add('animated', 'fadeInDown');
				this.counter++;
			} else {
				this.items[this.counter].style.display = 'flex';
				this.items[this.counter].classList.add('animated', 'fadeInDown');
				this.items[this.items.length - 1].remove();
			}
		});
	}

	_hideItems() {
		this.items.forEach((item, i, array) => {
			if (i < array.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	init() {
		try { 
			this._hideItems(); 
			this._bindTriggers();
		} catch (e) {}
		
	}
}