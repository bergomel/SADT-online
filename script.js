const search = document.getElementById('inputSADT')
const matchList = document.getElementById('matchList')
// import myJson from './procedimentos.json' assert {type: 'json'}

const pesquisarProcedimento = async searchText => {
    const res = await fetch('procedimentos.json')
    const dados = await res.json()
    let matches = dados.filter(procedimento => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return procedimento.procedimento.match(regex)
    })
if (searchText.length === 0) {
    matches = []
    matchList.innerHTML = ''
}   
    
    outputHtml(matches);
}

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="procedimento-card" id="${match.codigo}" onClick="selecionar(this.id)">
            <h4 class="procedimento-titulo">${match.procedimento}</h4>
            <small class="procedimento-codigo">${match.codigo}</small>
        </div>
        `).join('')
        matchList.innerHTML = html
    }
}

function selecionar(codigo) {
    console.log(`${codigo} foi clicado`)
    var element = document.getElementById(codigo);
    element.classList.add("procedimento-ativo");
}

search.addEventListener('input', () => pesquisarProcedimento(search.value))