import Agenda from "../models/Agenda.js";
import ListaEspera from "../models/ListaEspera.js";
import Turno from "../models/turno.mjs";
import SobreTurno from "../models/SobreTurno.js";

export const crearAgenda = async (req, res) => {
  const agenda = req.body;
  const { hora_inicio, hora_Fin, duacionHorario } = req.body;
  try {
    const agendaNueva = await Agenda.agregarAgenda(agenda);

    let [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
    let [horasFin, minutosFin] = hora_Fin.split(":").map(Number);

    const tiempoInicio = new Date();
    tiempoInicio.setHours(horasInicio, minutosInicio, 0, 0);

    const tiempoFin = new Date();
    tiempoFin.setHours(horasFin, minutosFin, 0, 0);

    let tiempo = new Date(tiempoInicio);

    const [horasDuracion, minutosDuracion] = duacionHorario
      .split(":")
      .map(Number);
    const duracionTurno = horasDuracion * 60 + minutosDuracion;

    console.log(duracionTurno);

    const turnos = [];

    while (tiempo < tiempoFin) {
      const turno = await Turno.crearTurnoConNull({
        fecha: null,
        hora: `${String(tiempo.getHours()).padStart(2, "0")}:${String(
          tiempo.getMinutes()
        ).padStart(2, "0")}:00`,
        idPaciente: null,
        idAgenda: agendaNueva,
        idEmpleado: null,
        idListaEspera: null,
        idEstadoHorario: 2, // "LIBRE"
      }); // FUNCION PARA CREEAR TURNO

      turnos.push(turno);
      tiempo = Agenda.crearIntervalosTurno(tiempo, duracionTurno);
      console.log(tiempo);
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
