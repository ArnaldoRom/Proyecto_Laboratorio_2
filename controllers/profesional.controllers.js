import { conexion } from "../config/db";

// Crear el profesional
export const crearProfesional = async (req, res) => {
    try {
        const profesional = req.body;

        
        if (!profesional.nombre || !profesional.apellido || !profesional.especialidad) {
            return res.status(400).json({ mensaje: "Es necesario llenar todos los campos" });
        }

        const query = `INSERT INTO profesional (nombre, apellido, especialidad, estado) VALUES (?, ?, ?, ?)`;
        const values = [profesional.nombre, profesional.apellido, profesional.especialidad, 1]; 

        
        const [result] = await conexion.execute(query, values);
        const profesionalId = result.insertId;

        res.status(201).json({ mensaje: "Profesional creado", profesionalId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

//Borrado logico de un profesional  (estado = 1 a estado = 0)
export const eliminarProfesional = async (req, res) => {
    try {
        const idProfesional = req.params.id;

        const query = "UPDATE profesional SET estado = 0 WHERE idProfesional = ?";
        const [result] = await conexion.execute(query, [idProfesional]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Profesional no encontrado" });
        }

        res.status(200).json({ mensaje: "Profesional dado de BAJA exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}
//crearProfesional, actualizarProfesional, altaProfesional, eliminarProfesional
// Actualizar un profesional
export const actualizarProfesional = async (req, res) => {
    try {
        const idProfesional = req.params.id;
        const { nombre, apellido, especialidad } = req.body;

        if (!nombre || !apellido || !especialidad) {
            return res.status(400).json({ mensaje: "Es necesario llenar todos los campos" });
        }

        const query = "UPDATE profesional SET nombre = ?, apellido = ?, especialidad = ? WHERE idProfesional = ?";
        const values = [nombre, apellido, especialidad, idProfesional];

        const [result] = await conexion.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Profesional no encontrado" });
        }

        res.status(200).json({ mensaje: "Profesional actualizado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

// Alta de un profesional dado de baja (estado = 0 a estado = 1)
export const altaProfesional = async (req, res) => {
    try {
        const idProfesional = req.params.id;

        const query = "UPDATE profesional SET estado = 1 WHERE idProfesional = ?";
        const [result] = await conexion.execute(query, [idProfesional]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Profesional no encontrado" });
        }

        res.status(200).json({ mensaje: "Profesional dado de ALTA exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}
