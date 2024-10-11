import express from "express";
import { conexion } from "./config/db.js";
import calendarioRouters from "./routes/calendario.routes.js";
import pacienteRouters from "./routes/paciente.routes.js";
import sucursalRouters from "./routes/sucursal.routes.js";

const app = express();

// Este codigo verifica que se conecto correctamente a la Base de Datos.. URL: localhost:3000/DB
app.get("/DB", async (req, res) => await res.send("ConexionCorrecta"));

app.use(express.json());

app.use(calendarioRouters);
app.use(pacienteRouters);
app.use(sucursalRouters);

app.listen(3000, () => {
  console.log("TAMO REEEDDDYYYY 😎 🤙 ");
});
