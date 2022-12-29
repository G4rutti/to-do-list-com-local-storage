'use strict'

//Funções
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    // clearFields()
    document.getElementById('modal').classList.remove('active')
}

//Crud - CREATE - READ - UPDATE - DELETE




// Eventos
document.getElementById('editar')
    .addEventListener('click', openModal)
document.getElementById('modalClose')
    .addEventListener('click', closeModal)
document.getElementById('cancelar')
    .addEventListener('click', closeModal)