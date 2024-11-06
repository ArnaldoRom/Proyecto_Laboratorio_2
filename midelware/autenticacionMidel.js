import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './token.env' });
const JWT_SECRET = process.env.JWT_SECRET;

export const validarToken = (roles = []) => {
  return (req, res, next) => {
    // Verificar si hay un token en las cookies
    const token = req.cookies.token;
    console.log("Token recibido:", token); // Log del token

    if (!token) {
      console.log("No hay token, acceso denegado."); // Log de error
      return res.status(403).json({ message: "No hay token, acceso denegado." });
    }

    // Verificar y decodificar el token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Token no válido:", err); // Log de error
        return res.status(403).json({ message: "Token no válido." });
      }

      console.log("Usuario autenticado:", user); // Log del usuario autenticado

      // Si se especifican roles, comprobar si el usuario tiene uno de ellos
      if (roles.length && !roles.includes(user.rol)) {
        console.log("Acceso denegado para el rol:", user.rol); // Log de acceso denegado
        return res.status(403).json({ message: "Acceso denegado." });
      }

      // Si el token es válido y el rol es permitido, continuar
      req.user = user;
      console.log("Acceso permitido, continuando..."); // Log de acceso permitido
      next();
    });
  };
};
