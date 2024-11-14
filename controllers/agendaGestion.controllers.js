import Agenda from "../models/agenda.js";
import ListaEspera from "../models/listaEspera.js";
import Turno from "../models/turno.mjs";
import SobreTurno from "../models/sobreTurno.js";

export const crearAgenda = async (req, res) => {
  const agenda = req.body;
  const { hora_inicio, hora_Fin, duacionHorario, dia } = req.body; // Incluye el campo 'dia' como VARCHAR
  try {
    // Agregar la agenda a la base de datos
    const agendaNueva = await Agenda.agregarAgenda(agenda);

    // Convertir el rango de tiempo de inicio y fin
    let [horasInicio, minutosInicio] = hora_inicio.split(":").map(Number);
    let [horasFin, minutosFin] = hora_Fin.split(":").map(Number);

    const tiempoInicio = new Date();
    tiempoInicio.setHours(horasInicio, minutosInicio, 0, 0);

    const tiempoFin = new Date();
    tiempoFin.setHours(horasFin, minutosFin, 0, 0);

    const [horasDuracion, minutosDuracion] = duacionHorario
      .split(":")
      .map(Number);
    const duracionTurno = horasDuracion * 60 + minutosDuracion;

    // Procesar la cadena 'dia' y convertirla en un array de números
    const diasAgenda = dia.split(",").map(Number); // Convertir la cadena "1,4" a [1, 4]

    const turnos = [];

    // Iterar sobre cada día en la lista de días de la agenda
    for (const diaTurno of diasAgenda) {
      let tiempo = new Date(tiempoInicio);

      while (tiempo < tiempoFin) {
        // Crear el turno para el día específico
        const turno = await Turno.crearTurnoConNull({
          diaTurno: String(diaTurno), // Convertimos a String para que sea VARCHAR
          hora: `${String(tiempo.getHours()).padStart(2, "0")}:${String(
            tiempo.getMinutes()
          ).padStart(2, "0")}:00`,
          idPaciente: null,
          idAgenda: agendaNueva,
          idEmpleado: null,
          idListaEspera: null,
          idEstadoHorario: 2, // "LIBRE"
        });

        turnos.push(turno);
        tiempo = Agenda.crearIntervalosTurno(tiempo, duracionTurno);
      }
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

export const filtroDias = async (req, res) => {
  try {
    const rows = await Agenda.porDias(req.params.nombre);

    if (rows.length === 0)
      return res.status(404).json({
        message: "Agenda del profecional no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Agenda: ", error);
    res.status(500).json({
      message: "Error al obtener Agenda por Dias",
    });
  }
};

//----------- TURNOS Libre --------//

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

export const filtroClasificacion = async (req, res) => {
  console.log(req.params.clasificacion);
  try {
    const rows = await Agenda.porClasificacion(req.params.nombre);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener agenda por clasificacion" });
  }
};

export const filtrosAgendas = async (req, res) => {
  const { especialidad, nombre, dia } = req.query;
  console.log("CONTROLADOR: ", especialidad, nombre, dia);
  try {
    const agendas = await Agenda.buscarAgendas({
      especialidad,
      nombre,
      dia,
    });
    res.json(agendas);
  } catch (error) {
    console.error("Error en la búsqueda de agendas:", error);
    res.status(500).json({ error: "Error al buscar agendas" });
  }
};

export const filtrosAgendaSinDia = async (req, res) => {
  const { especialidad, nombre } = req.query;
  console.log("CONTROLADOR: ", especialidad, nombre);
  try {
    const agendas = await Agenda.buscarAgendaSinDia({
      especialidad,
      nombre,
    });
    res.json(agendas);
  } catch (error) {
    console.error("Error en la búsqueda de agendas:", error);
    res.status(500).json({ error: "Error al buscar agendas" });
  }
};
