import Agenda from "../models/Agenda.js";
import Turno from "../models/turno.mjs";
import SobreTurno from "../models/SobreTurno.js";

// Arreglar  la creacion de la agenda agregar  creacion de sobreturno
export const crearAgenda = async (req, res) => {
  const {
    dia,
    duracionHorario,
    hora_inicio,
    hora_Fin,
    limiteTurno,
    idProfecionalEspecializado,
    idSucursal,
    idCalendario,
    estado,
  } = req.body;

  try {
    const agendaNueva = await Agenda.crearAgenda(
      dia,
      duracionHorario,
      hora_inicio,
      hora_Fin,
      limiteTurno,
      idProfecionalEspecializado,
      idSucursal,
      idCalendario,
      estado
    );

    let tiempo = hora_inicio;
    const turnos = [];

    while (tiempo < hora_Fin) {
      const turno = await Turno.crearTurnoConNull({
        fecha: null,
        hora: null,
        idPaciente: null,
        idAgenda: agendaNueva,
        idEmpleado: null,
        idListaEspera: null,
        idEstadoHorario: "Libre",
      }); // FUNCION PARA CREEAR TURNO

      turnos.push(turno);
      tiempo = Agenda.crearIntervalosTurno(tiempo, duracionHorario);
    }

    res.status(201).json({ agenda: agendaNueva, turnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la agenda y los turnos." });
  }
};

export const getAgendas = async (req, res) => {
  try {
    const rows = await Agenda.getAgenda();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Agenda: ", error);
    res.status(500).json({
      message: "Error al obtener las Agendas",
    });
  }
};

export const getAgendaId = async (req, res) => {
  try {
    const rows = await Agenda.getAgendaId(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "Agenda no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Agenda: ", error);
    res.status(500).json({
      message: "Error al obtener Agenda",
    });
  }
};

export const filtroEspecialidad = async (req, res) => {
  try {
    const rows = await Agenda.porEspecialidad(req.params.nombre);

    if (rows.length === 0)
      return res.status(404).json({
        message: "Agenda de la especialidad no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Agenda: ", error);
    res.status(500).json({
      message: "Error al obtener Agenda por especialidad",
    });
  }
};

export const filtroProfecional = async (req, res) => {
  try {
    const rows = await Agenda.porProfecional(req.params.nombre);

    if (rows.length === 0)
      return res.status(404).json({
        message: "Agenda del profecional no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Agenda: ", error);
    res.status(500).json({
      message: "Error al obtener Agenda por profecional",
    });
  }
};

export const filtroEstadoTurno = async (req, res) => {
  try {
    const rows = await Agenda.porEstadoTurno(req.params.estado);

    if (rows.length === 0)
      return res.status(404).json({
        message: "El turno esta ocupado",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Turnos libres: ", error);
    res.status(500).json({
      message: "Error al obtener Turnos libres",
    });
  }
};

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
    const nuevoPaciente = await SobreTurno.agregarPaciente(req.params.id);

    res.status(201).json({ Sucursal: nuevoPaciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al incorporar paciente" });
  }
};

export const retirarPaciente = async (req, res) => {
  try {
    const primero = await SobreTurno.primerPaciente(req.params.id);
    const paciente = await SobreTurno.sacarPaciente(primero, req.params.id);

    res.status(201).json({ Sucursal: paciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retirar paciente" });
  }
};
