class Persona {
    #nombre;
    #apellido;
    #obraSocial;
    #dni;
    #datosContacto;
    #fotocopiaDNI;

        // ----------------------------------------------- constructorres -----------------------------------
    constructor(nombre, apellido, obraSocial, dni, datosContacto, fotocopiaDNI) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#obraSocial = obraSocial;
        this.#dni = dni;
        this.#datosContacto = datosContacto;
        this.#fotocopiaDNI = fotocopiaDNI;
    }
        // ----------------------------------------------- constructor para profesional -----------------------------------
    constructor(nombre, apellido, dni, datosContacto) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#dni = dni;
        this.#datosContacto = datosContacto;
    }

        
    constructor() {}


        // ----------------------------------------------- getters -----------------------------------
    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    get obraSocial() {
        return this.#obraSocial;
    }

    get dni() {
        return this.#dni;
    }

    get datosContacto() {    
        return this.#datosContacto;
    }

    get fotocopiaDNI() {
        return this.#fotocopiaDNI;
    }
    
    // ----------------------------------------------- Setters -----------------------------------
    set nombre(value) {
        this.#nombre = value;
    }

    set apellido(value) {
        this.#apellido = value;
    }

    set obraSocial(value) { 
        this.#obraSocial = value;
    }

    set dni(value) {
        this.#dni = value;
    }

    set datosContacto(value) {
        this.#datosContacto = value;
    }

    set fotocopiaDNI(value) {
        this.#fotocopiaDNI = value;
    }
}
