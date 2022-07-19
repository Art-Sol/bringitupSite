import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(wrapper, prev, next, activeClass, animate, autoplay) {
		super(wrapper, prev, next, activeClass, animate, autoplay);
	}

	_addAnimate(slide) {
		try {
			slide.querySelector('.card__title').style.opacity = '1';
			slide.querySelector('.card__controls').style.opacity = '1';
			slide.querySelector('.card__controls-arrow').style.opacity = '1';
		} catch (error) {}
	}

	_removeAnimate(slide) {
		try {
			slide.querySelector('.card__title').style.opacity = '0.4';
			slide.querySelector('.card__controls').style.opacity = '0.5';
			slide.querySelector('.card__controls-arrow').style.opacity = '0';
		} catch (error) {}
	}

	_addActiveClass(slide) {
		slide.classList.add(this.activeClass);
	}

	_removeActiveClass(slide) {
		slide.classList.remove(this.activeClass);
	}

	_nextSlide() {
		const slidesArr = [...this.slides].filter(slide => {
			return slide.tagName !== "BUTTON";
		});

		const firstElement = slidesArr[0],
				secondElement = slidesArr[1];

		if (this.animate) {
			slidesArr.forEach(slide => {
				this._removeAnimate(slide);
			});
			this._addAnimate(secondElement);
		}

		if (this.activeClass) {
			slidesArr.forEach(slide => {
				this._removeActiveClass(slide);
			});
			this._addActiveClass(secondElement);
		}

		this.wrapper.appendChild(firstElement);
	}

	_prevSlide() {
		const slidesArr = [...this.slides].filter(slide => {
			return slide.tagName !== "BUTTON";
		});

		const lastElement =  slidesArr[slidesArr.length - 1],
				firstElement =  slidesArr[0];

		if (this.animate) {
			slidesArr.forEach(slide => {
				this._removeAnimate(slide);
			});
			this._addAnimate(lastElement);
		}

		if (this.activeClass) {
			slidesArr.forEach(slide => {
				this._removeActiveClass(slide);
			});
			this._addActiveClass(lastElement);
		}

		this.wrapper.insertBefore(lastElement, firstElement);
	}

	_autoplay() {
		if (this.autoplay) {
			let timerId = setInterval(() => {
				this._nextSlide();
			}, 2000);

			this.prev.forEach(btn => {
				btn.addEventListener('mouseover', () => {
					clearInterval(timerId);
				});
				btn.addEventListener('mouseout', () => {
					clearInterval(timerId);
					timerId = setInterval(() => {
						this._nextSlide();
					}, 2000);
				});
			});

			this.next.forEach(btn => {
				btn.addEventListener('mouseover', () => {
					clearInterval(timerId);
				});
				btn.addEventListener('mouseout', () => {
					clearInterval(timerId);
					timerId = setInterval(() => {
						this._nextSlide();
					}, 2000);
				});
			});

			this.slides.forEach(slide => {
				slide.addEventListener('mouseover', () => {
					clearInterval(timerId);
				});

				slide.addEventListener('mouseout', () => {
					clearInterval(timerId);
					timerId = setInterval(() => {
						this._nextSlide();
					}, 2000);
				});
			});
		}
	}

	_bindTriggers() {
		this.next.forEach(item => {
			item.addEventListener('click', () => this._nextSlide());
		});

		this.prev.forEach(item => {
			item.addEventListener('click', () => this._prevSlide());
		});
	}

	init() {
		if (this.wrapper) {
			this.wrapper.style.cssText = `
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				align-items: flex-start;
			`;

			if (this.animate) {
				this.slides.forEach(slide => {
					this._removeAnimate(slide);
				});
				this._addAnimate(this.slides[0]);
			}

			if (this.activeClass) {
				this.slides.forEach(slide => {
					this._removeActiveClass(slide);
				});
				this._addActiveClass(this.slides[0]);
			}

			this._bindTriggers();
			this._autoplay();
		}
	}
}