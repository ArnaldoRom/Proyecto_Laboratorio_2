import { Router } from "express";

const router = Router();

//---------------- VISTA PRINCIPAL DE LA APP --------------------//

router.get("/", (req, res) => {
  res.render("login");
});

//--------------- VISTA PROFECIONAL ---------------------------//

router.get("/vistaProfecional", (req, res) => {
  res.render("vistaProfecional/index");
});

router.get("/vista", (req, res) => {
  res.render("vistaProfecional/vista", { layout: false });
});

//---------------- VISTAS ADMINISTRADOR ----------------------//

router.get("/vistaAdministradora", (req, res) => {
  res.render("vistaAdministradora/index");
});

router.get("/crearProfesional", (req, res) => {
  res.render("vistaAdministradora/crearProfesional", { layaout: false });
});

router.get("/cargarSucursal", (req, res) => {
  res.render("vistaAdministradora/cargarSucursal", { layaout: false });
});

router.get("/cargarAgenda", (req, res) => {
  res.render("vistaAdministradora/cargarAgenda", { layaout: false });
});

router.get("/cargarCalendario", (req, res) => {
  res.render("vistaAdministradora/cargarCalendario", { layaout: false });
});

export default router;
