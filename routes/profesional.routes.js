import { Router } from "express";
import { crearProfesional, actualizarProfesional, altaProfesional, eliminarProfesional } from "../controllers/profesional.controllers.js";

Router.post("/profesional/nuevo", crearProfesional);

Router.patch("/profesional/actualizar/:id", actualizarProfesional);

Router.patch("/profesional/alta/:id", altaProfesional);

Router.patch("/profesional/baja/:id", eliminarProfesional);




