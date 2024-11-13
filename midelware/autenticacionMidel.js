import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./token.env" });
const JWT_SECRET = process.env.JWT_SECRET;

export const validarToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    console.log("TOKEN RECIBIDO:", token);

    if (!token) {
      console.log("No hay token, acceso denegado.");
      return res.status(403).json({ message: "No hay token, acceso denegado." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Token no válido:", err);
        return res.status(403).json({ message: "Token no válido." });
      }

      console.log("Usuario autenticado:", user);

      // Guardar el nombre del usuario en `res.locals` para acceso en la vista
      res.locals.nombreUsuario = user.nombreUsuario;

      // Permitir acceso si el usuario tiene el rol "Super"
      if (user.rol === "Super") {
        req.user = user;
        console.log("Acceso permitido para el rol Super, continuando...");
        return next();
      }

      // Verificar si el rol del usuario está en los roles permitidos
      if (roles.length && !roles.includes(user.rol)) {
        console.log("Acceso denegado para el rol:", user.rol);
        return res.status(403).json({ message: "Acceso denegado." });
      }

      req.user = user;
      console.log("Acceso permitido, continuando...");
      next();
    });
  };
};
