// import tuss, {estados, tabela24, tabela26, cid} from './start.js'
// let estados1 = []


async function fetchJSON(caminho) {
    const response = await fetch(caminho);
    const json = await response.json();
    return json;
}

fetchJSON('cid10.json')
    .then(json => {
        appendDatalist(json, 'lista-cid', true);
        var cid10 = json })

fetchJSON('estados-brasileiros.json')
    .then(json => {
        appendDatalist(json, "lista-uf");
        var uf = json})

fetchJSON('tabela24.json')
    .then(json => {
        appendDatalist(json, "lista-cbo");
        var tabela24 = json})

fetchJSON('tabela26.json')
    .then(json => {
        appendDatalist(json, "lista-conselho");
        var tabela26 = json})

fetchJSON('procedimentos.json')
    .then(json => {
        appendDatalist(json, "lista-procedimento", true);
        tuss = json;
        console.log(tuss)})

let procedimentosSelecionados = []
let tuss = []

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

function appendDatalist(estadosJson, datalistID, mostrarDescricao = false) {
    var datalistElement = document.getElementById(datalistID);
    for (var i =0; i<estadosJson.length; i++) {
        var opção = document.createElement("option")
        if (mostrarDescricao == false) {
            opção.value = estadosJson[i].código;
            opção.innerHTML = estadosJson[i].descrição;
            datalistElement.appendChild(opção)
        } else {
            opção.innerHTML = estadosJson[i].código;
            opção.value = estadosJson[i].descrição;
            datalistElement.appendChild(opção)
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        }
    }

// appendDatalist(tuss, "estados-procedimento", true)
// appendDatalist(tabela24, "estados-cbo")
// appendDatalist(tabela26, "estados-conselho")
// appendDatalist(cid, "estados-cid", true)


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
        var itemDiv = document.createElement('div');
        itemDiv.id = 'div-exame-selecionado-' + i
        itemDiv.dataset.indice_exame_selecionado = i;
        document.getElementById('exames').appendChild(itemDiv)

        var itemDescricao = document.createElement("input");
        itemDescricao.value = procedimentosSelecionados[i].descrição;
        itemDescricao.classList = 'exame-descricao'
        itemDescricao.dataset.campoReferencia = "26-" + (i+1)
        document.getElementById(itemDiv.id).appendChild(itemDescricao)

        var itemCodigo = document.createElement("input");
        itemCodigo.value = procedimentosSelecionados[i].código;
        itemCodigo.classList = 'exame-codigo'
        itemCodigo.dataset.campoReferencia = "25-" + (i+1)
        document.getElementById(itemDiv.id).appendChild(itemCodigo)

        var itemQtde = document.createElement("input");
        itemQtde.value = '1';
        itemQtde.classList = 'exame-qtde'
        itemQtde.dataset.campoReferencia = "27-" + (i+1)
        document.getElementById(itemDiv.id).appendChild(itemQtde)
    }
    campoTuss.value = null
})

// ESCONDER OS ELEMENTOS POUCO RELEVANTES

document.getElementById('mostrar-todos').addEventListener('click', (e) => {
    console.log(e.target.checked)
    let arrayDivsOpcionais = document.getElementsByClassName('opcional')
    for (var i=0; i < arrayDivsOpcionais.length; i++) {
        arrayDivsOpcionais[i].style.display = (e.target.checked) ? 'block' : 'none'
    }
    }
)

// <<  GERAR O PDF >>

document.getElementById('gerar-PDF').addEventListener('click', (e) => {
    let todosOsCampos = document.querySelectorAll('[data-campo-referencia]');
    let objetoComValoresPreenchidos = {}
    for (let i=0; i<todosOsCampos.length;i++) {
        let campo = todosOsCampos[i].dataset.campoReferencia
        let valor = todosOsCampos[i].value
        objetoComValoresPreenchidos[campo] = [valor]
    }
    console.log(objetoComValoresPreenchidos)
    let pdf_preenchido = pdfform().transform(current_buffer, objetoComValoresPreenchidos)
    var blob = new Blob([pdf_preenchido], {type: 'application/pdf'});
    var nomeBeneficiario = objetoComValoresPreenchidos[10][0]
    saveAs(blob, `guia_${nomeBeneficiario}.pdf`);
})

let current_buffer
function carregarPDF() {
    var url = 'pdf/sadt em excel.pdf';
    console.log(url)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
        if (this.status == 200) {
            current_buffer = this.response;
            console.log(current_buffer)
        } else {
            console.log('failed to load URL (code: ' + this.status + ')');
        }
    };
    xhr.send();
}
window.onload = carregarPDF;