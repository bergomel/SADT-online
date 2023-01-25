import tuss, {estados, tabela24, tabela26} from './start.js'
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

function appendDatalist(listaJson, datalistID, mostrarDescricao = false) {
    var datalistElement = document.getElementById(datalistID);
    for (var i =0; i<listaJson.length; i++) {
        var opção = document.createElement("option")
        if (mostrarDescricao == false) {
            opção.value = listaJson[i].código;
            opção.innerHTML = listaJson[i].descrição;
            datalistElement.appendChild(opção)
        } else {
            opção.innerHTML = listaJson[i].código;
            opção.value = listaJson[i].descrição;
            datalistElement.appendChild(opção)
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        }
    }

appendDatalist(tuss, "lista-procedimento", true)
appendDatalist(estados, "lista-uf")
appendDatalist(tabela24, "lista-cbo")
appendDatalist(tabela26, "lista-conselho")


// <<  SELECIONAR PROCEDIMENTOS  >>

document.getElementById("procedimento").addEventListener('keyup', (e) => {
            if (e.key == 'Enter') {
               document.getElementById('botao-adc-procedimento').click()
            }}
        )

document.getElementById('botao-adc-procedimento').addEventListener('click', () => {
    let campoTuss = document.getElementById('procedimento')
    let ExameSelecionado = tuss.find(item => item.descrição == campoTuss.value)
    procedimentosSelecionados.push(ExameSelecionado)
    removeAllChildNodes(document.getElementById('exames'))
    for (var i = 0; i < procedimentosSelecionados.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = procedimentosSelecionados[i].descrição;
        item.contentEditable = true
        item.classList = 'exame-descricao'
        document.getElementById('exames').appendChild(item)
        console.log(item)
    }
    campoTuss.value = null
})