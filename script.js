window.onload = function(){
	createTitleH1(textoDoCabecalho);
	criaSection('color-palette', 'main');
	criaSection('secao-botoes', 'main');
	criaButton('clear-board' , 'secao-botoes', 'Limpar', limpaCores);
	criaInput('board-size' , 'secao-botoes');
	criaButton('generate-board' , 'secao-botoes', 'VQV', alteraTamanhoDoQuadroDePixel);
	criaSection('pixel-board', 'main');
	criaQuadroDePixel(5, 5);
	criaCoresAleatorias();
}

const textoDoCabecalho = "Paleta de Cores";

function createTitleH1(titulo) {
	let recebe = document.querySelector('.cabecalho');
	let cria = document.createElement('h1');
	cria.innerText = titulo;
	cria.id = "title";
	recebe.appendChild(cria);
}

function criaDivCor(qualCor) {
	let recebe = document.getElementById('color-palette');
	for (let index = 0; index < qualCor.length; index++) {
		let cria = document.createElement('div');
		cria.addEventListener('click', function() {
			let aux = document.getElementsByClassName('color');
			for (let i = 0; i < aux.length; i++) {
				aux[i].className = 'color';
			}
			this.className += ' selected';
		})
		cria.className = 'color';
		cria.style.backgroundColor = qualCor[index];
		if (qualCor[index] === 'black') {
			cria.className += ' selected';
		}

		recebe.appendChild(cria);
	}
}

function criaSection(idDaSecao, classePai) {
	let recebe = document.querySelector(classePai);
	let cria  = document.createElement('section');
	cria.id = idDaSecao;
	recebe.appendChild(cria);
}

function criaQuadroDePixel(largura, comprimento) {
	let recebe = document.getElementById('pixel-board');
	for (let index = 0; index < largura; index++) {
		for (let index2 = 0; index2 < comprimento; index2++) {
			let cria = document.createElement('div');
			cria.addEventListener('click', function () {
				this.style.backgroundColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
			})

			cria.className = "pixel";
			cria.style.backgroundColor = 'white';
			recebe.appendChild(cria);
		}
	}
}

function criaButton(idDoButton, classePai, textoBotao, funcao) {
	let recebe = document.getElementById(classePai);
	let cria  = document.createElement('button');
	cria.addEventListener('click', funcao);
	cria.id = idDoButton;
	cria.innerText = textoBotao;
	recebe.appendChild(cria);
}

function criaInput(idDaSecao, classePai) {
	let recebe = document.getElementById(classePai);
	let cria  = document.createElement('input');
	cria.id = idDaSecao;
	cria.type = 'number';
	cria.min = '1';
	recebe.appendChild(cria);
}

function limpaCores() {
	let aux = document.getElementsByClassName('pixel');
	for (let index = 0; index < aux.length ; index++) {
		aux[index].style.backgroundColor = 'white';
	}
}

function alteraTamanhoDoQuadroDePixel() {
	let tamanho = document.getElementById('board-size').value;
	if (tamanho !== '') {
		let aux = document.getElementById('pixel-board');
		while (aux.firstChild) {
			aux.removeChild(aux.firstChild);
		}
		if (tamanho < '5') {
			aux.style.width = (5 * 42) + 'px';
			aux.style.height = (5 * 42) + 'px';
			criaQuadroDePixel(5, 5);
		} else {
			aux.style.width = (tamanho * 42) + 'px';
			aux.style.height = (tamanho * 42) + 'px';
			criaQuadroDePixel(tamanho, tamanho);			
			}	
	} else {
		window.alert('Board inválido!');
	}

}

function criaCoresAleatorias () {
	let arrayDeCores = [];
	arrayDeCores[0] = 'black';
	for (let index = 1; index < 4; index++) {
		let str = '#';
		while (str.length < 7) {
			str += Math.floor(Math.random() * 0x10).toString(16);
		}
		arrayDeCores[index] = str;
	}
	criaDivCor(arrayDeCores);
}