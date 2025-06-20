// encontrar o botao adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')

const tarefas = []

btnAdicionarTarefa.addEventListener('click', () => {
	//toggle = ""alternancia"" da classe 'show'
	formAdicionarTarefa.classList.toggle('show')

})

formAdicionarTarefa.addEventListener('submit', (evento) => {
	evento.preventDefault();
	const tarefa = {
		descricao: textArea.value,
	}
	tarefas.push(tarefa)
	//JSON.stringify() converte o objeto em uma string JSON
	localStorage.setItem('tarefas', JSON.stringify(tarefas))
})
