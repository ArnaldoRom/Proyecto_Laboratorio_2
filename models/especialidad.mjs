class Especialidad{
    #especialidad;
    constructor(especialidad){
        this.#especialidad = especialidad;
    }
    get especialidad(){
        return this.#especialidad;
    }
    set especialidad(value){
        this.#especialidad = value;
    }
}