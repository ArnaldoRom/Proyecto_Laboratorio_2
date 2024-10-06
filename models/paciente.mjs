class Paciente{
    #persona
    contructor(persona){
        this.#persona = persona;
    }

    get persona(){
        return this.#persona;
    }

    set persona(value){ 
        this.#persona = value;
    }
}