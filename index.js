const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego{
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(10)
            // map() necesita que los elementos del array esten inicializados, con fill(0) estoy
            // diciendo que se inicialicen en 0
            .fill(0)
            .map(n => Math.floor(Math.random () * 4))
    }

    siguienteNivel(){
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(num){
        switch(num){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde' 
        }
    }

    transformarColorANumero(color){
        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3 
        }
    }

    iluminarSecuencia(){
        for(var i = 0; i < this.nivel; i++){
            const num = this.secuencia[i]
            const color = this.transformarNumeroAColor(num)
            setTimeout(() => this.iluminarColor(color), i * 1000)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const colorElegido = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(colorElegido)

        this.iluminarColor(colorElegido)
    }
}



function empezarJuego(){

    window.juego = new Juego()
}

