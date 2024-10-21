import Agenda from "../models/Agenda.js";
import Turno from "../models/turno.mjs";

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

export const getAgendas = async (req, res) => {};

export const getAgendasId = async (req, res) => {};

export const filtroEspecialidad = async (req, res) => {};

export const filtroProfecional = async (req, res) => {};

export const filtroEstadoTurno = async (req, res) => {};
