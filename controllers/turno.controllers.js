import {conexion} from "../config/db.js";

//crearTurno - modificarTurno - borrarTurno - getTurno - cambiarEstadoTurno

// Crear turno
export const crearTurno = async (req, res) => {
    try {
        const turno = req.body;

        // Validar que el objeto turno no esté vacío
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
            res.status(500).json({ mensaje: "opps error al crear turno" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
