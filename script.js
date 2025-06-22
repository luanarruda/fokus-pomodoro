const html = document.querySelector('html');

const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const botaoStartPause = document.querySelector('#start-pause');
const textoStartPause = document.querySelector('#start-pause span');
const iconeStartPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const textos = {
	foco: {
		titulo: `Otimize sua produtividade, <br>
		<strong class="app__title-strong">mergulha no que importa.</strong>`
	},
	'descanso-curto': {
		titulo: `Que tal dar uma respirada?, <br>
		<strong class="app__title-strong">Faça uma pausa curta.</strong>`
	},
	'descanso-longo': {
		titulo: `Hora de voltar à superfície. <br>
		<strong class="app__title-strong">Faça uma pausa longa.</strong>`
	}
};

// ----- Funções principais -----

function configurarBotao(botao, contexto, tempo) {
	botao.addEventListener('click', () => {
		tempoDecorridoEmSegundos = tempo;
		alterarContexto(contexto);
		botao.classList.add('active');
	});
}

function alterarContexto(contexto) {
	mostrarTempo();
	botoes.forEach((botao) => botao.classList.remove('active'));
	
	html.setAttribute('data-contexto', contexto);
	banner.setAttribute('src', `imagens/${contexto}.png`);
	titulo.innerHTML = textos[contexto].titulo;
}

function iniciarOuPausar() {
	if (intervaloId) {
		audioPause.play();
		zerar();
		return;
	}

	audioPlay.play();
	intervaloId = setInterval(contagemRegressiva, 1000);
	textoStartPause.textContent = 'Pausar';
	iconeStartPause.setAttribute('src', 'imagens/pause.png');
}

function zerar() {
	clearInterval(intervaloId);
	textoStartPause.textContent = 'Iniciar';
	iconeStartPause.setAttribute('src', 'imagens/play_arrow.png');
	intervaloId = null;
}

function contagemRegressiva() {
	if (tempoDecorridoEmSegundos <= 0) {
		audioTempoFinalizado.play();
		alert('Tempo esgotado!');
		const focoAtivo = html.getAttribute('data-contexto') == 'foco';
		if (focoAtivo) {
			const evento = new CustomEvent ('focoFinalizado')
			document.dispatchEvent(evento);
		}
		zerar();
		return;
	}

	tempoDecorridoEmSegundos -= 1;
	mostrarTempo();
}

function mostrarTempo() {
	const tempo = new Date(tempoDecorridoEmSegundos * 1000);
	const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
		minute: '2-digit',
		second: '2-digit'
	});
	tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// ----- Eventos -----

musicaFocoInput.addEventListener('change', () => {
	if (musica.paused) {
		musica.play().catch(() => console.log('Erro ao tocar música'));
	} else {
		musica.pause();
	}
});

botaoStartPause.addEventListener('click', iniciarOuPausar);

// Configuração dos botões de contexto
configurarBotao(botaoFoco, 'foco', 30);
configurarBotao(botaoCurto, 'descanso-curto', 10);
configurarBotao(botaoLongo, 'descanso-longo', 15);

// ----- Inicialização -----
mostrarTempo();
