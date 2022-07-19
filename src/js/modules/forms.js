export default class Form {
	constructor(form) {
		this.form = form;
		this.inputs = document.querySelectorAll('input');
		this.selects = document.querySelectorAll('select');
	}

	_clearInputs() {
		this.inputs.forEach(input => input.value = '');
		this.selects.forEach(select => select.value = 'New-York');
	}

	_validEmailInput() {
		const inputs = document.querySelectorAll('[name = email]');
		inputs.forEach(input => {
			input.addEventListener('input', (e) => {
				const currentSimbol = e.data,
						inputValue = e.target.value;

				if (/[^a-z 0-9 @ \.]/ig.test(currentSimbol)) {
					e.target.value = inputValue.replace(currentSimbol, '');
				}
			});
		});
	}

	_validPhoneInput() {
		const inputs = document.querySelectorAll('[name = phone]');

		function getInputNumberValue(e) {
			const inputValueFull = e.target.value,
					inputValueCurrent = e.data;

			if (inputValueFull.length < 2 && inputValueCurrent === '+') {
				return '+';
			} else if (inputValueFull.length > 2 && (inputValueFull[0] !== '1' && inputValueFull[0] !== '+')) {
				return '1' + inputValueFull.replace(/\D/g, '');
			} else {
				return inputValueFull.replace(/\D/g, '');
			}
			
		}

		function makeInputValue (e) {
			const inputValueNumberFull = getInputNumberValue(e),
					firstSimbol = inputValueNumberFull[0];

			let resultInputValue;

					switch (firstSimbol) {
						case '1': resultInputValue = '+1'; break;
						case '+': resultInputValue = '+'; break;
						default: resultInputValue = '+1 (' + inputValueNumberFull[0]; break;
					}
				
					if (inputValueNumberFull.length > 1 ) {
						resultInputValue += ' (' + inputValueNumberFull.substring(1, 4);
					}
					if (inputValueNumberFull.length >= 5) {
						resultInputValue += ') ' + inputValueNumberFull.substring(4, 7);
					}
					if (inputValueNumberFull.length >= 8) {
						resultInputValue += ' - ' + inputValueNumberFull.substring(7, 11);
					}
					if (!inputValueNumberFull) {
						resultInputValue = '';
					}

			return resultInputValue;
		}

		function initValid(e) {
			const input = e.target;
				
				if (input.value.length === input.selectionStart) { // если бегунок вконце (просто вводим цифры)
					input.value = makeInputValue(e);
				} else if (input.value.length !== input.selectionStart) { // если бегунок в середине введенной строки
					let range = input.selectionStart - 1;

					if (e.data && /\D/g.test(e.data) ) { // вводим не число (букву)
						input.value = input.value.replace(input.value[input.selectionStart - 1], '');
						input.setSelectionRange(range, range);
					} else {
						if (input.value.length > 19) {
							const firstPartOfNumber = input.value.slice(0, range);
							const secondPartOfNumber = input.value.slice(input.selectionStart);
							let index, rangeIndex;
							let arr = [];

							if ([' ', '(', ')', '-'].includes(secondPartOfNumber[0])) {
								rangeIndex = 2;
							} else {
								rangeIndex = 1;
							}

							for (let i = 0; i < 4; i++) {
								if (!([' ', '(', ')', '-'].includes(secondPartOfNumber[i]))) {
									index = i;
									break;
								} else {
									arr.push(secondPartOfNumber[i]);
								}
							}

							input.value = firstPartOfNumber + arr.join('') + e.data + secondPartOfNumber.slice(index+1);

							let nextSimbol = input.value[range+1];
							while ([' ', '(', ')', '-'].includes(nextSimbol)) {
								range++;
								nextSimbol = input.value[range+1];
							}

							input.setSelectionRange((range + rangeIndex), (range + rangeIndex));
						}
					}
				}
		}
		
		inputs.forEach(input => {
			input.addEventListener('input', initValid);
		});
	}

	async _postData(data) {
		const response = await fetch('assets/question.php', {
			method: 'POST',
			body: data
		});
		
		return await response.text();
	}

	_bindTriggers() {
		document.querySelectorAll(this.form).forEach(currentForm => {
			currentForm.addEventListener('submit', (e) => {
				e.preventDefault();
				
				let messageBlock = document.createElement('div');
				messageBlock.innerHTML = `
					<h3 style = "text-align:center; padding-top: 50px">Идет отправка данных</h3>
				`;
				currentForm.style.display = 'none';
				currentForm.parentElement.insertAdjacentElement('beforeend', messageBlock);
				
				const formData = new FormData(currentForm);
				this._postData(formData)
					.then(res => {
						messageBlock.innerHTML = `
							<h3 style = "color: green; text-align:center; padding-top: 50px">Данные отправлены</h3>
						`;
						console.log(res);
					})
					.catch(err => {
						console.log(err);
						messageBlock.innerHTML = `
							<h3 style = "color: red; text-align:center; 
							padding-top: 50px"">Данные не отправились. 
							Попробуйте чуть позже</h3>
						`;
					})
					.finally(
						setTimeout(() => {
							messageBlock.remove();
							currentForm.style.display = 'block';
							this._clearInputs();
						}, 3000)
					);
			});
		});
	}

	init() {
		this._bindTriggers();
		this._validEmailInput();
		this._validPhoneInput();
	}
}