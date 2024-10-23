

//------------ SOBRE TURNO -------------------------//

export const getSobreTurnos = async (req, res) => {
    try {
      const rows = await SobreTurno.getlistaSobreTurnos();
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener lista ", error);
      res.status(500).json({
        message: "Error al obtener lista de Sobre turnos",
      });
    }
  };
  
  export const incorporarPaciente = async (req, res) => {
    try {
      const hora = req.params.hora;
      const id = req.params.id;
      const nuevoPaciente = await SobreTurno.agregarPaciente(hora, id);
  
      res.status(201).json({ Sucursal: nuevoPaciente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al incorporar paciente" });
    }
  };
  
  export const retirarPaciente = async (req, res) => {
    try {
      const paciente = await SobreTurno.sacarPaciente(req.params.id);
  
      res.status(201).json({ Sucursal: paciente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retirar paciente" });
    }
  };
  
  //--------------- LISTA ESPERA ----------------------//
  
  export const getLista = async (req, res) => {
    try {
      const rows = await ListaEspera.getListaEspera();
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener lista ", error);
      res.status(500).json({
        message: "Error al obtener lista de espera",
      });
    }
  };
  
  export const crearListaEspera = async (req, res) => {
    const paciente = req.params.idPaciente;
    const agenda = await Agenda.getAgendaId(req.params.idAgenda);
  
    if (!paciente || !agenda) {
      return res.status(400).json({ message: "Faltan parámetros requeridos." });
    }
  
    try {
      const nuevaLista = await ListaEspera.agregarListaEspera(paciente, agenda);
  
      res.status(201).json({ ListaEspera: nuevaLista });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la agenda y los turnos." });
    }
  };