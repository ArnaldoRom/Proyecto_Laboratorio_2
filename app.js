import express from "express";
import { conexion } from "./config/db.js";
import pacienteRouters from "./routes/paciente.routes.js";

const app = express();

// Este codigo verifica que se conecto correctamente a la Base de Datos.. URL: localhost:3000/DB
app.get("/DB", async (req, res) => await res.send("ConexionCorrecta"));

app.use(pacienteRouters);

app.listen(3000, () => {
  console.log("TAMO REEEDDDYYYY 😎 🤙 ");
});
