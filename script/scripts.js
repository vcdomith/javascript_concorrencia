import selecionaCotacao from "./imprimeCotacao.js";


const elementoGraficoDolar = document.querySelector('#graficoDolar')

const graficoDolar = new Chart(elementoGraficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    }
});

function geraHorario() {

    let data = new Date()
    let horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    
    console.log(horario);
    return horario

}

function adicionarDados(grafico, legenda, dados) {

    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })

    grafico.update()

}

let workerDolar = new Worker('./script/workers/workerDolar.js')
workerDolar.postMessage('usd')

workerDolar.addEventListener('message', event => {

    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao('dolar', valor)
    adicionarDados(graficoDolar, tempo, valor)

})

const elementoGraficoIene = document.querySelector('#graficoIene')

const graficoIene = new Chart(elementoGraficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
})

let workerIene = new Worker('./script/workers/workerIene.js')

workerIene.postMessage('iene')

workerIene.addEventListener('message', event => {

    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao('iene', valor)
    adicionarDados(graficoIene, tempo, valor)

})