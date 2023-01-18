import tuss, {estados, tabela24} from './start.js'
class procedimento {
    constructor(código, descrição) {
        this.código = código;
        this.descrição = descrição
    }
}
let procedimentosSelecionados = []


// <<  LOCAL STORAGE  >>

// Ao carregar, popular campos com local storage
    let inputsSolicitante = document.querySelectorAll("#dadosSolicitante input")
    for (var i=0; i < inputsSolicitante.length; i++) {
        inputsSolicitante[i].value = localStorage.getItem(inputsSolicitante[i].id)
    }

// Salvar os dados do solicitante no local storage
document.getElementById("lembrarSolicitante").addEventListener('click', function() {
    let inputsSolicitante = document.querySelectorAll("#dadosSolicitante input")
    for (var i=0; i < inputsSolicitante.length; i++) {
        localStorage.setItem(inputsSolicitante[i].id, inputsSolicitante[i].value)
    }
} )

// <<  DATALIST  >>

function appendDatalist(listaJson, datalistID) {
    var datalistElement = document.getElementById(datalistID);
    for (var i =0; i<listaJson.length; i++) {
        var opção = document.createElement("option")
        opção.value = listaJson[i].código;
        opção.innerHTML = listaJson[i].descrição;
        datalistElement.appendChild(opção)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        }
    }

appendDatalist(tuss, "TUSSLista")
appendDatalist(estados, "estados")
appendDatalist(tabela24, "tabela24")


// <<  SELECIONAR PROCEDIMENTOS  >>

document.getElementById("TUSSInput").addEventListener('keyup', (e) => {
            if (e.key == 'Enter') {
               document.getElementById('adcProcedimento').click()
            }}
        )

document.getElementById('adcProcedimento').addEventListener('click', () => {
    let campoTuss = document.getElementById('TUSSInput')
    let ExameSelecionado = tuss.find(item => item.procedimento == campoTuss.value)
    procedimentosSelecionados.push(ExameSelecionado)
    removeAllChildNodes(document.getElementById('exames'))
    for (var i = 0; i < procedimentosSelecionados.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = procedimentosSelecionados[i].procedimento;
        document.getElementById('exames').appendChild(item)
        console.log(item)
    }
    campoTuss.value = null
})