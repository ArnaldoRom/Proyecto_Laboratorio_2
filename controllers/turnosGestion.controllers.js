import Turno from "../models/turno.mjs";
import Agenda from "../models/agenda.js";
import ListaEspera from "../models/listaEspera.js";
import SobreTurno from "../models/sobreTurno.js";

export const reservarTurno = async (req, res) => {
  const data = req.body;

  try {
    const reservar = await Turno.modificarTurno(data);
    res.status(201).json({ Turno: reservar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al reservar el turno" });
  }
};

export const getTurno = async (req, res) => {
  try {
    const rows = await Turno.getTurno();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Turno: ", error);
    res.status(500).json({
      message: "Error al obtener los Turnos",
    });
  }
};

export const getTurnoId = async (req, res) => {
  try {
    const rows = await Turno.getTurnoId(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "El turno no existe",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Turno ", error);
    res.status(500).json({
      message: "Error al obtener el turno",
    });
  }
};

export const getTurnoPorAgenda = async (req, res) => {
  try {
    const rows = await Turno.getTurnoPorAgenda(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "La agenda no existe",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Turno por Agenda", error);
    res.status(500).json({
      message: "Error al obtener el turno por Agenda",
    });
  }
};

export const cambiarEstado = async (req, res) => {
  const data = req.body;
  try {
    const result = await Turno.cambiarEstado(data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El turno no existe" });
    }

    return res.status(200).json({ message: "Estado cambiado con exito" });
  } catch (error) {
    console.error("Error al Actualizar");
    return res.status(500).json({
      message: "Error al cambiar estado del Turno",
    });
  }
};

export const cambiarEstadoAReservado = async (req, res) => {
  const { idTurno, idPaciente } = req.body; // Extraer idTurno e idPaciente del cuerpo de la solicitud

  try {
    const affectedRows = await Turno.cambiarEstadoAReservado(idTurno, idPaciente); // Pasar ambos parámetros
    if (affectedRows === 0) {
      return res.status(404).json({ message: "El turno no existe" });
    }

    return res.status(200).json({ message: "Estado cambiado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el estado del turno y asignar el paciente:", error);
    return res.status(500).json({
      message: "Error al cambiar el estado del turno",
    });
  }
};



export const recuperarTurnosConfirmados = async (req, res) => {
  try {
    const rows = await Turno.turnosConfirmadosPorAgenda(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "Ningun Turno confirmado",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Turno ", error);
    res.status(500).json({
      message: "Error al obtener el turno",
    });
  }
};

//----------------------- SOBRE TURNO -----------------//

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

export const crearSobreTurno = async (req, res) => {
  const data = req.body;
  const { hora, idAgenda } = req.body;
  try {
    const reservados = await Turno.turnosReservadosPorHora(hora, idAgenda);

    if (reservados.length === 0) {
      throw new Error("No se puede crear sobreturno");
    }

    const sobreturnos = await SobreTurno.getlistaSobreTurnoPorAgenda(idAgenda);
    const sobreTurnosMaximos = await Agenda.limiteSobreTurno(idAgenda);

    if (sobreturnos.length >= sobreTurnosMaximos) {
      throw new Error("Se alcanzo el limite de Sobre Turnos");
    }

    const lista = await SobreTurno.crearSobreTurno(data);

    res.status(201).json({ ListaSobreTurno: lista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al incorporar paciente" });
  }
};

export const retirarPaciente = async (req, res) => {
  try {
    const paciente = await SobreTurno.sacarPaciente(req.params.id);

    res.status(201).json({ Eliminado: paciente });
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
  const paciente = req.body.idPaciente;
  const agenda = await Agenda.getAgendaId(req.params.idAgenda);

  if (!paciente || !agenda) {
    return res.status(400).json({ message: "Faltan parámetros requeridos." });
  }

  try {
    const turnoDisponible = await Turno.turnosReservadosPorAgenda(agenda);

    if (turnoDisponible.length === 0) {
      const nuevaLista = await ListaEspera.agregarListaEspera(paciente, agenda);
      return res.status(201).json({ ListaEspera: nuevaLista });
    } else {
      return res.status(400).json({ message: "Existen turnos disponibles" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la agenda y los turnos." });
  }
};

export const sacarPacienteDeListaEspera = async (req, res) => {
  try {
    const { idTurno } = req.body;
    const turnoCancelado = await Turno.getTurnoId(idTurno);

    if (turnoCancelado[0].idestadoHorario === 5) {
      const primero = await ListaEspera.primerPaciente(
        turnoCancelado[0].idAgenda
      );
      if (primero) {
        await Turno.asignarPaciente(
          primero.idPaciente,
          turnoCancelado[0].idTurno
        );
        await ListaEspera.sacarPacienteDeListaEspera(
          primero.idPaciente,
          turnoCancelado[0].idAgenda
        );
        return res
          .status(200)
          .json({ message: "Paciente agregado al turno calncelado" });
      } else {
        return res
          .status(400)
          .json({ message: "No queda ningun paciente en la LIsta de Espera" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retirar paciente" });
  }
};
