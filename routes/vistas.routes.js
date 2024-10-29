import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/vistaProfecional", (req, res) => {
  res.render("vistaProfecional/index");
});

router.get("/vista", (req, res) => {
  res.render("vistaProfecional/vista", { layout: false });
});

router.get("/crearProfesional", (req, res) => {
  res.render("vistasDinamicas/crearProfesional", { layaout: false });
});

router.get("/cargarSucursal", (req, res) => {
  res.render("vistasDinamicas/cargarSucursal", { layaout: false });
});

router.get("/cargarAgenda", (req, res) => {
  res.render("vistasDinamicas/cargarAgenda", { layaout: false });
});

router.get("/cargarCalendario", (req, res) => {
  res.render("vistasDinamicas/cargarCalendario", { layaout: false });
});

export default router;
