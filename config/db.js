import { createPool } from "mysql2";

export const conexion = createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: " laboratorio_2",
});
