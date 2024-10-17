import { json } from "express";
import { conexion } from "../config/db.js";

// export const getAgenda = async (req, res) => {
//   try {
//     const [rows] = await conexion.query("SELECT * FROM agenda");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };

// export const getAgendaId = async (req, res) => {
//   try {
//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda WHERE idAgenda = ?",
//       [req.params.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({
//         message: "Agenda no exite",
//       });
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Error al obtener Agenda: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agenda",
//     });
//   }
// };

// export const aregarAgenda = async (req, res) => {
//   const agenda = req.body;

//   if (
//     !agenda ||
//     !agenda.dia ||
//     !agenda.duracionHorario ||
//     !agenda.hora_inicio ||
//     !agenda.hora_Fin ||
//     !agenda.clasificacion ||
//     !agenda.idProfecionalEspecializado ||
//     !agenda.idSursal ||
//     agenda.idCalendario
//   ) {
//     return res.status(400).json({ message: "El dato es requerido" });
//   }

//   const query = `
//         INSERT INTO agenda (dia, duracionHorario, hora_inicio, hora_Fin, clasificacion, limiteTurno, idProfesionalEspecializado, idSucursal, idCalendario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   const {
//     dia,
//     duracionHorario,
//     hora_inicio,
//     hora_Fin,
//     clasificacion,
//     limiteTurno = null,
//     idProfecionalEspecializado,
//     idSursal,
//     idCalendario,
//     estado = 1,
//   } = agenda;

//   const values = [
//     dia,
//     duracionHorario,
//     hora_inicio,
//     hora_Fin,
//     clasificacion,
//     limiteTurno,
//     idProfecionalEspecializado,
//     idSursal,
//     idCalendario,
//     estado,
//   ];

//   try {
//     const [result] = await conexion.execute(query, values);
//     const agendaId = result.insertId;

//     res.status(201).json({
//       idCalendario: agendaId,
//       dia,
//       duracionHorario,
//       hora_inicio,
//       hora_Fin,
//       clasificacion,
//       limiteTurno,
//       idProfecionalEspecializado,
//       idSursal,
//       idCalendario,
//       estado,
//     });
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     return res.status(500).json({
//       message: "Error al cargar una nueva Agenda",
//     });
//   }
// };

// -- BUSCA AGENDAS POR ESPECIALIDAD
// export const porEspecialidad = async (req, res) => {
//   try {
//     const especialidad = req.params.nombre;

//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN especialidad ON profecionalespecializado.idEspecialidad = especialidad.idEspecialidad WHERE nombre = ?",
//       [especialidad]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };

// -- BUSCA AGENDA POR PROFECIONAL
// export const porProfecional = async (req, res) => {
//   try {
//     const profecional = req.params.nombre;
//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN profesional ON profecionalespecializado.idProfesional = profesional.idProfesional WHERE profesional.nombre = ?",
//       [profecional]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };

// -- BUSCA AGENDAS/TURNOS POR HORARIOS DISPONMIBLES
// export const porHorarioDisponible = async (req, res) => {
//   try {
//     const estado = "Libre";
//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda INNER JOIN turno ON agenda.idAgenda = turno.idAgenda INNER JOIN estadohorario ON turno.idEstadoHorario = estadohorario.idEstadoHorario WHERE estadohorario.estado = ?",
//       [estado]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };

// -- BUSCA AGENDAS/TURNOS POR ESTADOS
// export const porEstadosTurnos = async (req, res) => {
//   try {
//     const estado = req.params.nombre;
//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda INNER JOIN turno ON agenda.idAgenda = turno.idAgenda INNER JOIN estadohorario ON turno.idEstadoHorario = estadohorario.idEstadoHorario WHERE estadohorario.estado = ?",
//       [estado]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };

// -- BUSCA AGENDAS POR CLASIFICACION
// export const porClasificacion = async (req, res) => {
//   try {
//     const clasificacion = req.params.nombre;
//     const [rows] = await conexion.query(
//       "SELECT * FROM agenda WHERE clasificacion = ?",
//       [clasificacion]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener las Agendas: ", error);
//     res.status(500).json({
//       message: "Error al obtener Agendas",
//     });
//   }
// };
