class procedimento {
    constructor(código, descrição) {
        this.código = código;
        this.descrição = descrição
    }
}
let procedimentosSelecionados = []

procedimentosSelecionados.push(new procedimento('01020304', 'Hemograma completo'))
procedimentosSelecionados.push(new procedimento('1111111', 'Creatinina'))
console.log(procedimentosSelecionados[0].descrição)