// encontrar o botao adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')

btnAdicionarTarefa.addEventListener('click', () => {
	//toggle = ""alternancia"" da classe 'hidden'
	formAdicionarTarefa.classList.toggle('show')

})