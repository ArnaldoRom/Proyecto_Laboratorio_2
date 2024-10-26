import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/crearProfesional", (req, res) => {
  res.render("vistasDinamicas/crearProfesional", { layaout: false });
});

router.get("/cargarSucursal", (req, res) => {
  res.render("vistasDinamicas/cargarSucursal", { layaout: false });
});

export default router;
