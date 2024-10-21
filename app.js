import express from "express";
import { conexion } from "./config/db.js";
import agendaRouters from "./routes/agenda.routes.js";
import gestionRouters from "./routes/gestion.routes.js";

const app = express();

// Este codigo verifica que se conecto correctamente a la Base de Datos.. URL: localhost:3000/DB
app.get("/DB", async (req, res) => await res.send("ConexionCorrecta"));

app.use(express.json());

app.use(agendaRouters);
app.use(gestionRouters);

app.listen(3000, () => {
  console.log("TAMO REEEDDDYYYY 😎 🤙 ");
});
