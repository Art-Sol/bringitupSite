export default class Slider {
	constructor({	wrapper = null,
						next = null,
						prev = null,
						activeClass = '',
						animate,
						autoplay
					} = {}) {
		this.wrapper = document.querySelector(wrapper);
		try { this.slides = this.wrapper.children; } catch (e) {} 
		this.prev = document.querySelectorAll(prev);
		this.next = document.querySelectorAll(next);
		this.activeClass = activeClass;
		this.animate = animate;
		this.autoplay = autoplay;
		this.slideIndex = 1;
	}
}