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

- Se realizo la correccion de las entidades sucursal y calendario, tambien se creo el controler **_GESTION_** que va a menejar:

  - Crear Sucursales y calendarios
  - Poder ver la lista de las sucursales y los calendarios creados.
  - Filtrar por id.
  - Actualizar los Calendarios.

- Se corrrigio el **_agenda controler_**.. ahora se puede :

  - crear agenda la cual tambien crea los turnos de acuerdo a la duracion de la agenda
  - filtrar agenda por : especialidad, profecional y por estado del turno

- Se empeso con el **_Turno controler_** se puede realiar:

  - Cargar lod datos necesarios del **turno**:
    - paciente
    - fecha
    - empleado
    - clasificacion
    - el turno automaticamente pasa a **reservado**
  - Manejar los **Sobre Turnos**:
    - crear Sobre turno
    - eliminar
    - listar
  - Manejo de la **Lista de Espera**:
    - crear lista espera
    - verificar si un turno se cancelo y se saca al primer paciente de la lista de espera
    - borrar paciente de lista de espera

- Se corrigio el view con las indentaciones, tambien se realizo la rutas de las vistas y se configuro el app.js para que trabajara con el motor de plantilla PUG..

- Se empezo con las vistas enlazamos dos vistas para
  ver si se pódia cargar en el mismo index sin la necesidad de ir a otra pagina..

- Se enlazo las plantillas pug al index.. que eso va a ser la vita del **ADMINISTRADOR**,
  tambien se colocaron hojas de estilos **CSS** para cada plantilla..

---

### DUDAS QUE SURGEN

    *_No se si sobreturno y lista esperairian en agenda controller?? ------------// CORREGIDO

    *_ Se podra elegir una vista para cada perfil (USUARIOS) diferentes?..

### ERRORES A CORREGIR

    *_GREGAR AFFECTER ROWS EN LAS VALIDACIONES AL CREAR

    *_UTILIZAR SOLO GET y POST--------- // CORREGIDO

    *_Faltaria agregar un mensaje de EXITO al crear sucursal y calendario....

### LO QUE ME FALTA

    *_ Terminar lista de espera en TURNO GESTION CONTOLER..... -----------------// CORREGIDO

    *_ Realizar la vista del administrador....
