export default class Download {
	constructor (btnsSelector) {
		this.btns = document.querySelectorAll(btnsSelector);
		this.path = "assets/img/mainbg.jpg";
	}

	_downloadItem(e, curBtn, path) {
		const linkElement = document.createElement('a');
		linkElement.style.display = 'none';
		linkElement.setAttribute('href', path);
		linkElement.setAttribute('download', 'file');

		curBtn.append(linkElement);
		
		linkElement.addEventListener('click', (e) => {
			e.stopPropagation();
		});

		linkElement.click();
		linkElement.remove();
	}

	_bindTriggers() {
		this.btns.forEach(btn => {
			btn.style.cursor = 'pointer';
			btn.addEventListener('click', (e) => {
				this._downloadItem(e, btn, this.path);
			});
		});
	}

	init() {
		this._bindTriggers();
	}
}