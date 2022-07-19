import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Diferences from "./modules/diferences";
import Form from "./modules/forms";
import Spoiler from "./modules/spoiler";
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {

	const pagePageSlider = new MainSlider({
		next: '.next',
		wrapper: '.page'
	});
	pagePageSlider.init();

	const modulesPageSlider = new MainSlider({
		next: '.next',
		prev: '.prevmodule',
		wrapper: '.moduleapp'
	});
	modulesPageSlider.init();

	const modulesPageGorizontalSlider = new MainSlider({
		next: '.nextmodule',
		prev: '.prevmodule',
		wrapper: '.moduleapp'
	});
	modulesPageGorizontalSlider.init();

	const showUpSlider = new MiniSlider({
		wrapper: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
		animate: true,
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		wrapper: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		animate: true,
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		wrapper: '.feed__slider',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active',
	});
	feedSlider.init();

	new VideoPlayer('.play', '.overlay').init();
	
	new Diferences('.officerold', '.officer__card-item').init();
	new Diferences('.officernew', '.officer__card-item').init();

	new Form('form').init();

	new Spoiler('.module__info-show').init();

	new Download('.download').init();
});