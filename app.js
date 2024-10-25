import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { conexion } from "./config/db.js";
import agendaRouters from "./routes/agendaGestion.routes.js";
import gestionRouters from "./routes/gestion.routes.js";
import profecionalesGestionRouters from "./routes/profesionalesGestion.routes.js";
import turnoGestion from "./routes/turnoGestion.routes.js";
import usuarioGestion from "./routes/usuarioGestion.routes.js";
import vistas from "./routes/vistas.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//--- Defino la carpeta publica para poder usar el css y script del lado del cliente
const publico = path.join(__dirname, "public");

// Este codigo verifica que se conecto correctamente a la Base de Datos.. URL: localhost:3000/DB
app.get("/DB", async (req, res) => await res.send("ConexionCorrecta"));

app.use(express.static(publico));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(agendaRouters);
app.use(gestionRouters);
app.use(profecionalesGestionRouters);
app.use(turnoGestion);
app.use(usuarioGestion);
app.use(vistas);

app.listen(3000, () => {
  console.log("TAMO REEEDDDYYYY 😎 🤙 ");
});
