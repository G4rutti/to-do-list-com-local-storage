'use strict'

//Funções
const ValidarCampos = () => {
    return document.getElementById('form-primario').reportValidity()
}



const getLocalStorage = () => JSON.parse(localStorage.getItem('db_activities')) ?? []
const setLocalStorage = (dbActivitie) => localStorage.setItem("db_activities", JSON.stringify(dbActivitie))

//Crd - CREATE - READ - DELETE
const createActivitie = (activitie) => {
    const dbActivitie = getLocalStorage()
    dbActivitie.push (activitie)
    setLocalStorage(dbActivitie)
}

const readActivities = () => getLocalStorage()

const deleteActivitie = (index) => {
    const dbActivitie = readActivities()
    dbActivitie.splice(index, 1)
    setLocalStorage(dbActivitie)
}

// Interação com o Layout
const createRow = (activitie, index) => {
    const newRow = document.createElement('div')
    newRow.innerHTML = `
        <div class="activitie">
        <p id="atividade-${index}">${activitie.atividade}</p>
        <div class="actions">
            <button id="excluir-${index}" class="excluir" data-action="excluir">Excluir</button>
            <button id="feito-${index}"  class="feito" data-action="feito">Feito</button>
        </div>
        </div>
        <hr>
    `
    document.querySelector('.main>.activities>div').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('.main>.activities>div>div')
    rows.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () => {
    const dbActivitie = readActivities()
    clearTable()
    dbActivitie.forEach(createRow)
}
const saveActivitie = () => {
    if (ValidarCampos()) {
        const activitie = {
           atividade: document.querySelector("#atividade").value,
           estado: "nao feito"
        }   
        createActivitie(activitie)
        updateTable()
    }
}
const deletarAtividadeDaTela = (evento) => {
    if(evento.target.type === "submit"){
        const [action, index] = evento.target.id.split('-')
        if (action == 'excluir') {
            deleteActivitie(index)
            updateTable()
        } 
        else if(action == "feito"){
            atividade.estado = "feito"
            if(atividade.estado == "feito"){
                updateTable()
                const atividade = document.getElementById("atividade-"+index)
                atividade.style.textDecoration = "line-through"
            }
            else if(atividade.estado == "nao feito"){
                updateTable()
                const atividade = document.getElementById("atividade-"+index)
                atividade.style.textDecoration = "none"
            }
            
        }
    }
}

updateTable()



// Eventos
document.getElementById("enviar")
    .addEventListener('click', saveActivitie)
document.querySelector(".main>.activities>div")
    .addEventListener('click', deletarAtividadeDaTela)