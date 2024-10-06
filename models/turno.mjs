class Turno{
    #horarioDisponible;
    #paciente;
    #estado;
    constructor(horarioDisponible, paciente, estado){
        this.#horarioDisponible = horarioDisponible;
        this.#paciente = paciente;
        this.#estado = estado;
    }

    get horarioDisponible(){
        return this.#horarioDisponible;
    }
    get paciente(){
        return this.#paciente;
    }
    get estado(){
        return this.#estado;
    }    
    function reservarTurno() { }

    function cancelaTurno(){}

    function cambiaEstado(){}


}
