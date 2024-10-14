import { conexion } from "../config/db";

// Crear turno
export const crearTurno = async (req, res) => {
    try {
        const turno = req.body;

        if (!turno || Object.keys(turno).length === 0) {
            return res.status(400).json({ mensaje: "El turno no puede ser null o undefined" });
        }

        const { fecha, hora, estado, idPaciente, idAgenda, idSucursal, idEmpleado, idListaEspera, idEstadoHorario } = turno;

        if (!fecha || !hora || !estado || !idPaciente || !idAgenda || !idSucursal || !idEmpleado || !idListaEspera || !idEstadoHorario) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios en el turno" });
        }

        const query = `INSERT INTO turno (fecha, hora, estado, idPaciente, idAgenda, idSucursal, idEmpleado, idListaEspera, idEstadoHorario) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [fecha, hora, estado, idPaciente, idAgenda, idSucursal, idEmpleado, idListaEspera, idEstadoHorario];
        
        const [result] = await conexion.query(query, values);

        if (result.affectedRows > 0) {
            res.status(201).json({ mensaje: "Turno creado sin problemas pa", turnoId: result.insertId });
        } else {
            res.status(500).json({ mensaje: "Opps, error al crear turno" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Modificar turno
export const modificarTurno = async (req, res) => {
    try {
        const idTurno = req.params.id;
        const { fecha, hora, estado, idPaciente, idAgenda, idSucursal, idEmpleado, idListaEspera, idEstadoHorario } = req.body;

        if (!fecha || !hora || !estado || !idPaciente || !idAgenda || !idSucursal || !idEmpleado || !idListaEspera || !idEstadoHorario) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios para modificar el turno" });
        }

        const query = `UPDATE turno 
                       SET fecha = ?, hora = ?, estado = ?, idPaciente = ?, idAgenda = ?, 
                       idSucursal = ?, idEmpleado = ?, idListaEspera = ?, idEstadoHorario = ?
                       WHERE idTurno = ?`;
        const values = [fecha, hora, estado, idPaciente, idAgenda, idSucursal, idEmpleado,
             idListaEspera, idEstadoHorario, idTurno];

        const [result] = await conexion.query(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: "Turno modificado exitosamente" });
        } else {
            res.status(404).json({ mensaje: "Turno no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Borrado logico de turno
export const borrarTurno = async (req, res) => {
    try {
        const idTurno = req.params.id;

        const query = "UPDATE turno SET estado = 0 WHERE idTurno = ?";
        const [result] = await conexion.query(query, [idTurno]);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: "Turno borrado exitosamente" });
        } else {
            res.status(404).json({ mensaje: "Turno no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

//Tengo una duda con turno, al turno lo obtenemos por turno o por agenda?
/*
//Obtener un turno por ID
export const getTurno = async (req, res) => {
    try {
        const idTurno = req.params.id;

        const query = "SELECT * FROM turno WHERE idTurno = ? AND estado != 0";
        const [rows] = await conexion.query(query, [idTurno]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ mensaje: "Turno no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
*/

// Cambiar estado del turno
export const cambiarEstadoTurno = async (req, res) => {
    try {
        const idTurno = req.params.id;
        const { nuevoEstado } = req.body;

        if (nuevoEstado === undefined) {
            return res.status(400).json({ mensaje: "El estado es requerido" });
        }

        const query = "UPDATE turno SET estado = ? WHERE idTurno = ?";
        const values = [nuevoEstado, idTurno];

        const [result] = await conexion.query(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: "Estado del turno actualizado exitosamente" });
        } else {
            res.status(404).json({ mensaje: "Turno no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
