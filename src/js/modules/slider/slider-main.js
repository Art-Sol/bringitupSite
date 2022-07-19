import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(next, prev) {
		super(next, prev);
	}

	_showSlide(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n <= 0) {
			this.slideIndex = this.slides.length;
		}

		try {
			this.banner.style.opacity = '0';
			if (n === 3) {
				this.banner.classList.add('animated');
				setTimeout(() =>{
					this.banner.style.opacity = '1';
					this.banner.classList.add('slideInUp');
				}, 3000);
			} else {
				this.banner.classList.remove('slideInUp');
			}
		} catch(e) {}

		this.slides.forEach(item => {
			item.style.display = 'none';
		});
		
		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	_changeSlide(n) {
		this._showSlide(this.slideIndex += n);
	}

	_bindTriggers() {
		this.next.forEach(item => {
			item.addEventListener('click', (e) => {
				if (item.tagName === 'A') {
					e.preventDefault();
					this._changeSlide(1);
				}
			});
		});

		this.prev.forEach(item => {
			item.addEventListener('click', (e) => {
				if (item.tagName === 'A') {
					e.preventDefault();
					this._changeSlide(-1);
				}
			});
		});

		this.next.forEach(item => {
			const homeBtn = item.parentElement.previousElementSibling;

			homeBtn.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this._showSlide(this.slideIndex);
			});
		});
	}

	init() {
		if (this.wrapper) {
			try {
				this.banner = document.querySelector('.hanson');
			} catch(e) {}
			
			this._bindTriggers();
			this._showSlide(this.slideIndex);
		}
	}
}