const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const contador = document.getElementById('contador')
const ULTIMO_NIVEL = 10

class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.iniciarContador()
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL)
            // map() necesita que los elementos del array esten inicializados, con fill(0) estoy
            // diciendo que se inicialicen en 0
            .fill(0)
            .map(n => Math.floor(Math.random () * 4))
    }

    siguienteNivel(){
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        this.actualizarContador()
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

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    iniciarContador(){
        contador.value = `Nivel: 0`
    }

    actualizarContador(){
        contador.value = `Nivel: ${this.nivel}`
    }

    elegirColor(ev){
        const colorElegido = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(colorElegido)

        this.iluminarColor(colorElegido)
        if (numeroColor === this.secuencia[this.subNivel]){
            this.subNivel++
            if(this.subNivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL +1)){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1000)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        this.iniciarContador()
        swal('Felicitaciones!', 'Ganaste, demostraste no apestar tanto', 'success')
            .then(this.inicializar)
    }

    perdioElJuego(){
        this.iniciarContador()
        swal('JAA JA JA JAAA!', 'Perdiste, seguí participando', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}



function empezarJuego(){

    window.juego = new Juego()
}

