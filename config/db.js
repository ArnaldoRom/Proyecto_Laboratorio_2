import { createPool } from "mysql2/promise";

export const conexion = createPool({
  connectionLimit: 10,
  host: "bmfxiz178dqlzsh7a3u6-mysql.services.clever-cloud.com",
  user: "ukkqa8nbhmkexhi5",
  password: "ukkqa8nbhmkexhi5",
  port: 3306,
  database: "bmfxiz178dqlzsh7a3u6",
});
