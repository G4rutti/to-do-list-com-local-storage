'use strict'

//Funções
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    // clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_activities')) ?? []
const setLocalStorage = (dbActivitie) => localStorage.setItem("db_activities", JSON.stringify(dbActivitie))

//Crud - CREATE - READ - UPDATE - DELETE
const createActivitie = (activitie) => {
    const dbActivitie = getLocalStorage()
    dbActivitie.push (activitie)
    setLocalStorage(dbActivitie)
}

const readActivities = () => getLocalStorage()

const updateActivities = (index, activitie) => {
    const dbActivitie = readActivities()
    dbActivitie[index] = activitie
    setLocalStorage(dbActivitie)
}

const deleteActivitie = (index) => {
    const dbActivitie = readActivities()
    dbActivitie.splice(index, 1)
    setLocalStorage(dbActivitie)
}



// Eventos
document.getElementById('editar')
    .addEventListener('click', openModal)
document.getElementById('modalClose')
    .addEventListener('click', closeModal)
document.getElementById('cancelar')
    .addEventListener('click', closeModal)