const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

// Remover a classe 'active' de todos os botões
const botoes = document.querySelectorAll('.app__card-button');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 5;
const startPauseBtn = document.querySelector('#start-pause');

let intervaloId = null;



musicaFocoInput.addEventListener('change', () => {
	if(musica.paused) {
		musica.play();
	} else {
		musica.pause();
	}
});

focoBtn.addEventListener('click', () => {
 alterarContexto('foco');
 focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
  alterarContexto('descanso-curto');
  curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
  alterarContexto('descanso-longo');
  longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
	botoes.forEach(function(contexto) {
		contexto.classList.remove('active');
	});
	html.setAttribute('data-contexto', contexto);
	banner.setAttribute('src', `imagens/${contexto}.png`);
	switch (contexto) {
		case 'foco':
			titulo.innerHTML = `Otimize sua produtividade, <br>
			<strong class = "app__title-strong">mergulha no que importa.</strong>`;
			break;
		case 'descanso-curto':
			titulo.innerHTML = `Que tal dar uma respirada?, <br>
			<strong class = "app__title-strong">Faça uma pausa curta.</strong>`;
			break;
		case 'descanso-longo':
			titulo.innerHTML = `Hora de voltar a superficie. <br>
			<strong class = "app__title-strong">Faça uma pau longa.</strong>`;
			
			default:
			break;
		
}}

const contagemRegressiva = () => {
	if(tempoDecorridoEmSegundos <= 0) {
		zerar();
		alert('Tempo esgotado!');
		return;
	}
	tempoDecorridoEmSegundos -= 1
	console.log('Temporizador: ' + tempoDecorridoEmSegundos);
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
	if(intervaloId) {
		zerar();
		return;
	}
	intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
	clearInterval(intervaloId);
	intervaloId = null;
}