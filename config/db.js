import { createPool } from "mysql2/promise";

export const conexion = createPool({
  connectionLimit: 10,
  host: "bdczv9ftuawqozfihoyw-mysql.services.clever-cloud.com",
  user: "ufifr5j4p0iz3yem",
  password: "rhCl5Qag5k4AnoE0qoMD",
  port: 3306,
  database: "bdczv9ftuawqozfihoyw",
});
