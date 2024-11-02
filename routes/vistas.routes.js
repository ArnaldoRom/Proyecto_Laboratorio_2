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
// /vistaAdministradora  /vistaSecretaria
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

//---------------------- VISTA SECRETARIA -----------------//

router.get("/vistaSecretaria", (req, res) => {
  res.render("vistaSecretaria/index");
});

router.get("/listaAgendas", (req, res) => {
  res.render("vistaSecretaria/agendas", { layaut: false });
});

router.get("/cargaturnos", (rea, res) => {
  res.render("vistaSecretaria/turnos", { layout: false });
});

router.get("/gestionPacientes", (req, res) => {
  res.render("vistaSecretaria/paciente", { layaut: false });
});

export default router;
