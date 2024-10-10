import { conexion } from "../config/db";

// Obtener un usuario por nombre de usuario
export const getNombre = async (req, res) => {
    try {
        const [rows] = await conexion.query(
            "SELECT * FROM usuario WHERE nombreUsuario = ?", 
            [req.params.nombre]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Verificar la contraseña de un usuario
export const verificarContrasena = async (req, res) => {
    try {
        
        const [rows] = await conexion.query(
            "SELECT * FROM usuario WHERE contraseña = ?", 
            [req.params.contraseña]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ mensaje: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Borrado de usuario (decidir si logico o permanente: SI es logico hay que usar un UPDATE y actualizar el estado)
export const borrarUsuario = async (req, res) => {
    try {
        const [rows] = await conexion.query(
            "DELETE FROM usuario WHERE nombreUsuario = ?", 
            [req.params.nombreUsuario]
        );

        res.json({ mensaje: "Usuario borrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Validar usuario
export const validarUsuario = async (req, res) => {
    try {
        const { nombreUsuario, contraseña, estado } = req.body;
        
        
        const [rows] = await conexion.query(
            "SELECT * FROM usuario WHERE  AND nombreUsuario = ? AND contraseña = ? AND estado = true",
            [ nombreUsuario, contraseña, estado]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
