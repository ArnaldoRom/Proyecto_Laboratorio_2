import { Router } from "express";

const router = Router();

router.post("/paciente", (req, res) => res.send("Creando Paciente"));

export default router;
