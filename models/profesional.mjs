class Profesional {
    #matricula;
    #especialidad;
    #persona;
    #agenda;

   
    constructor(matricula, especialidad, persona, agenda) {
        this.#matricula = matricula;            
        this.#especialidad = especialidad;      
        this.#persona = persona;                
        this.#agenda = agenda;                  
    }

    get matricula() {
        return this.#matricula;
    }

    get agenda() {
        return this.#agenda;
    }

    get persona() {
        return this.#persona;
    }

    get especialidad() {
        return this.#especialidad;
    }

    set matricula(value) {
        this.#matricula = value;
    }

    set agenda(value) {
        this.#agenda = value;
    }

    set persona(value) {
        this.#persona = value;
    }

    set especialidad(value) {
        this.#especialidad = value;
    }
    
}