'use strict'

//Funções
const ValidarCampos = () => {
    return document.getElementById('form-primario').reportValidity()
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

const readActivitie = (index) => {
    const dbActivitie = readActivities()
    const atividade = dbActivitie[index]
    return atividade
}

const updateAtividade = (index, atividade) => {
    const dbActivitie = readActivities()
    dbActivitie[index] = atividade
    setLocalStorage(dbActivitie)
}

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
        updateTable()
        console.log(evento.target.dataset.action)
        const [action, index] = evento.target.id.split('-')
        const atividade = readActivitie(index)
        console.log(index)
        if(action == "excluir"){
            deleteActivitie(index)
            updateTable()
            atualizarTela()
        }
        else if(action == "feito"){
            console.log(atividade)
            if(atividade.estado == "nao feito"){
                atividade.estado = "feito"
                updateAtividade(index,atividade)
                document.getElementById("atividade-"+index).style.textDecoration = 'line-through'
                atualizarTela()
            }
            else{
                atividade.estado = "nao feito"
                updateAtividade(index,atividade)
                document.getElementById("atividade-"+index).style.textDecoration = 'solid'
                atualizarTela()         
             }
            
        }
    }
}
const atualizarTela = () => {
    const dbActivitie = readActivities()
    for(let i = 0; i < dbActivitie.length; i = i + 1) {
        if(dbActivitie[i].estado == "feito"){
            console.log(dbActivitie[i])
            const atividade = document.getElementById("atividade-"+i)
            atividade.style.textDecoration = "line-through" 
        }
        else{
            console.log(dbActivitie[i])

            const atividade = document.getElementById("atividade-"+i)
            atividade.style.textDecoration = "none" 
        }
    }
    // dbActivitie.forEach(function(atividade,index){
    //     console.log(atividade, index)
    // })


}

updateTable()
atualizarTela()



// Eventos
document.getElementById("enviar")
    .addEventListener('click', saveActivitie)
document.querySelector(".main>.activities>div")
    .addEventListener('click', deletarAtividadeDaTela)