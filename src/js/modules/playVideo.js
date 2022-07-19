export default class VideoPlayer {
	constructor(btnSelectors, overlaySelector) {
		this.btns = document.querySelectorAll(btnSelectors);
		this.overlay = document.querySelector(overlaySelector);
		this.close = this.overlay.querySelector('.close');
	}

	_bindTriggers() {
		this.btns.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				if (!item.querySelector('.play__circle').classList.contains('closed')) {
					this.activeBtn = item;

					const path = item.dataset.url,
					regExpPath = new RegExp(`${path}`, `g`);
					if (document.querySelector('iframe#frame') ) {
						const currentLinkVideo = document.querySelector('iframe#frame').getAttribute('src');
						if (regExpPath.test(currentLinkVideo)) {
							this.overlay.style.display = 'flex';
						} else {
							this.player.loadVideoById(path);
							this.overlay.style.display = 'flex';
						}
					} else {
						this._createPlayer(path);
						this.overlay.style.display = 'flex';
					}
				}
			});
		});
	}

	_bindClose() {
		this.close.addEventListener('click', () => {
			this.overlay.style.display = 'none';
			this.player.pauseVideo();
		});
	}

	_youtubeApiInit() {
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	_createPlayer(url) {
		// this.done = false;
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			playerVars: {
				start: 0
			},
			videoId: `${url}`,
			events: {
				'onReady': this._onPlayerReady.bind(this),
				'onStateChange': this._onPlayerStateChange.bind(this)
			}
		});
	}

	_onPlayerReady(event) {
		this.player.playVideo();
	}

	_onPlayerStateChange(event) {
		try {
			const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling,
			iconBtn = blockedElem.querySelector('.play__circle'),
			textBtn = blockedElem.querySelector('.play__text'),
			activeSvg = this.activeBtn.querySelector('svg').cloneNode(true);
			
			
			if (event.data === 0 && iconBtn) {
				if (iconBtn.classList.contains('closed')) {
					blockedElem.style.filter = 'none';
					blockedElem.style.opacity = '1';

					iconBtn.classList.remove('closed');
					iconBtn.querySelector('svg').remove();
					iconBtn.append(activeSvg);

					textBtn.classList.remove('attention');
					textBtn.textContent = 'play video';
				}
			}
		} catch (e) {}
	}

	_stopVideo() {
		this.player.stopVideo();
	}

	init() {
		if (this.btns.length > 0) {
			this._youtubeApiInit();
			this._bindTriggers();
			this._bindClose();
		}
	}
}