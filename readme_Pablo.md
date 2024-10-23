## QUE SE REALIZO

- Se crearon las clases de las entidades que van a intervenir el en proyecto.
  Las cuales poseen constructor y getters y setters

- Se instalaron modulos necesarios para empezar a codear los archivos que van a interactuar con en el server

- Se codeo el app.js para levantar el server en localhost: "3000". Usando el comando "npm run start" en consola de VSC

- Se creo una carpeta config la cual adentro contiene el archivo db.js que es donde se realiza la conexion a la base de datos

- Se actualizaron los datos de los models, porque se reviso el trabajo y se creo un nuevo DER. Tambien se establecio la conexion a la base de datos.. usando Rutas.. se creo el archivo de rutas de pacientey paciente controller..

- Se se empezo a codear las rutas basicas de un CRUD en pacientes como tambien la logica de Programacion en el controller de paciente... Las funciones GET,GET/ID y POST estan funcionales.,faltaria codear la de PUT/PATHd

- Se completo el CRUD para paciente , calendario, y sucursal... Tambien de crearon los archivos con las respectivas rutas...

- Se separo las consultas SQL y se las mando a las clases correspondiente... Faltaria crear el nuevo controllers

- Se realizo las funciones de sobreturno.

- Se realizo la correccion de las entidades sucursal y calendario, tambien se creo el controler GESTION que va a menejar:

  - Crear Sucursales y calendarios
  - Poder ver la lista de las sucursales y los calendarios creados.
  - Filtrar por id.
  - Actualizar los Calendarios.

- Se corrrigio el agenda controler.. ahora se puede :
  - crear agenda la cual tambien crea los turnos de acuerdo a la duracion de la agenda
  - filtrar agenda por : especialidad, profecional y por estado del turno

---

### DUDAS QUE SURGEN

    *_No se si sobreturno y lista esperairian en agenda controller??

### ERRORES A CORREGIR

    *_GREGAR AFFECTER ROWS EN LAS VALIDACIONES AL CREAR

    *_Faltaria agregar un mensaje de EXITO al crear sucursal y calendario....
