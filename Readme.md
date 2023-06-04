# API de Usuarios

Esta API permite realizar operaciones relacionadas con usuarios, como obtener usuarios, crear usuarios, actualizar usuarios y eliminar usuarios.

Ruta de la api > https://ncback-production.up.railway.app



## Obtener todos los usuarios

Obtiene la lista de todos los usuarios registrados en el sistema.

-   Método: `GET`
-   Ruta: `/api/usuarios/`

#### Parámetros de consulta

Ninguno.

#### Respuesta exitosa

-   Código de estado: `200 OK`
-   Tipo de contenido: `Json`

### Ejemplo de respuesta:
```json
[
  {
    "id": "1",
    "nombre": "Usuario 1",
    "correo": "usuario1@example.com"
  },
  {
    "id": "2",
    "nombre": "Usuario 2",
    "correo": "usuario2@example.com"
  },
  {
    "id": "3",
    "nombre": "Usuario 3",
    "correo": "usuario3@example.com"
  }
]
```

### Respuesta no exitosa

- Código de estado: `404 Not Found`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "Usuario no encontrado"
}
```

## Obtener un usuario por correo

Obtiene un usuario específico por su correo electrónico.

-   Método: GET
-   Ruta: `/api/usuarios/`

#### Parámetros de consulta

-   `correo` (string, opcional): Correo electrónico del usuario a buscar.

### Ejemplo de petición:
Body:
```json
{
	"correo":"sadsad@email.com"
}
```

#### Respuesta exitosa

-   Código de estado: `200 OK`
-   Tipo de contenido: `Json`

### Ejemplo de respuesta:

```json
{
  "id": "4",
  "nombre": "Nuevo Nombre",
  "correo": "nuevo.correo@example.com"
}
```

### Respuesta no exitosa

- Código de estado: `404 Not Found`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "Usuario no encontrado"
}
```

## Obtener usuario por id

Trae los datos de un usuario especifico por su id

- Método: `GET`
- Ruta: `/api/usuarios/user/:id`

### Parámetros de ruta

- `id` (string, obligatorio): ID del usuario a buscar.

### Ejemplo de peticion:

Params:

- `/api/usuarios/user/646523b0bb4be194b9207c02`

### Respuesta exitosa

 - Código de estado: `200 Ok`
 - Tipo de contenido: `Json`

### Ejemplo de respuesta

```json
{
	"nombre" : "pepito",
	"correo" : "pepito@email.com",
	"contrasena" : "password"
}
```

### Respuesta no exitosa

- Códigos de estado: `404 Not Found`, `500 Internal Server Error`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "Usuario no encontrado"
}
```

## CheckLogin

Esta ruta se utiliza para realizar la verificación de inicio de sesión de un usuario.

- Método: `POST`
- Ruta: `/api/usuarios/loginm`

### Parámetros de la solicitud

 - `nombre`(string, obligatorio): Nombre del usuario.
 - `contrasena`(string, obligatorio): Contraseña del usuario

### Ejemplo de petición:

Body:
```json
{
	"correo": "sadsad@email.com",
	"contrasena":"password"
}
```

### Respuesta exitosa

- Código de estado: `200 Ok`
- Tipo de contenido: `Json`

### Ejemplo de respuesta:
```json
{
	"mensaje" : "Ingreso exitoso"
}
```

### Respuesta no exitosa

- Códigos de estado: `401 Unauthorized`,`404 Not Found`, `500 Internal Server Error`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "La  contraseña del ususario no coincide"
}
```
## Crear un nuevo usuario

Crea un nuevo usuario.

-   Método: `POST`
-   Ruta: `/api/usuarios/`

#### Parámetros de cuerpo de la solicitud

-   `nombre` (string, obligatorio): Nombre del usuario.
-   `correo` (string, obligatorio): Correo electrónico del usuario.
-   `contrasena` (string, obligatorio): Contraseña del usuario.

### Ejemplo de petición:

Body:
```json
{
  "nombre": "Nuevo Nombre",
  "correo": "nuevo.correo@example.com",
  "contrasena": "password"
}
```

#### Respuesta exitosa

-   Código de estado: `201 Created`
-   Tipo de contenido: `Json`

### Ejemplo de respuesta:
```json
{
  "id": "4",
  "nombre": "Nuevo Nombre",
  "correo": "nuevo.correo@example.com"
}
```

### Respuesta no exitosa

- Códigos de estado: `409 Conflict`, `500 Internal Server Error`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "El correo electrónico ya está registrado"
}
```

## Actualizar un usuario

Actualiza los datos de un usuario existente.

-   Método: `PUT`
-   Ruta: `/api/usuarios/:id`

#### Parámetros de ruta

-   `id` (string, obligatorio): ID del usuario a actualizar.

#### Parámetros de cuerpo de la solicitud

-   `nombre` (string, opcional): Nuevo nombre del usuario.
-   `correo` (string, opcional): Nuevo correo electrónico del usuario.
-   `contrasena` (string, opcional): Nueva contraseña del usuario.

### Ejemplo de petición:

Params:
- `/api/usuarios/646523b0bb4be194b9207c02`

Body:
```json
{
  "nombre": "Nuevo Nombre",
  "correo": "nuevo.correo@example.com",
  "contrasena": "password"
}
```

#### Respuesta exitosa

-   Código de estado: `200 OK`
-   Tipo de contenido: `Json`

### Ejemplo de respuesta:
```json
{
  "id": "4",
  "nombre": "Nuevo Nombre",
  "correo": "nuevo.correo@example.com"
}
```

### Respuesta no exitosa

- Códigos de estado: `404 Not Found`, `500 Internal Server Error`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "Usuario no encontrado"
}
```

## Eliminar un usuario

Elimina un usuario existente.

-   Método: `DELETE`
-   Ruta: `/api/usuarios/:id`

#### Parámetros de ruta

-   `id` (string, obligatorio): ID del usuario a eliminar.

### Ejemplo de petición: 

Params:
-  `/api/usuarios/646523b0bb4be194b9207c02`

#### Respuesta exitosa

-   Código de estado: 200 OK
-   Tipo de contenido: application/json

### Ejemplo de respuesta:
```json
{
  "mensaje": "Usuario eliminado exitosamente"
}
```

### Respuesta no exitosa

- Códigos de estado: `404 Not Found`, `500 Internal Server Error`
- Tipo de contenido: `Json`

### Ejemplo de respuesta no exitosa
```json
{
	"mensaje" : "Usuario no encontrado"
}
```
---

# API Restaurantes

Esta API permite realizar operaciones relacionadas con Restaurantes, como obtener, crear, actualizar y eliminar.

Ruta de la API:  [https://ncback-production.up.railway.app](https://ncback-production.up.railway.app/)

## Ver Restaurant

Obtiene todos los restaurantes registrados y la cantidad total.

-   Método:  `GET`
-    Ruta:  `/api/restaurant`

En caso de solo querer 1 restaurant por correo.

-   Ruta 2:  `/api/restaurant/my`
- query: ?correo=correo@gmail.com

Parámetros de consulta: (Params)

-   `page`  (param,opcional): pagina.
-   `limit`  (param,opcional): elementos por pagina.

Ejemplo de petición: query
```
ruta: ruta/api/restaurant?page=1&limit=100
```

Respuesta exitosa:

```json

          {
            "msg": "Lista de restaurantes",
            "page": 1,
            "limit": 100,
            "total": 1,
            "restaurants": [
                {
                    "_id": "647a83c6207aebd584ae3b5c",
                    "nombre": "san Ponciano",
                    "direccion": "las magnolias",
                    "telefono": "123445567",
                    "correo": "gianco3108@gmail.com",
                    "dias": [
                        "lunes",
                        "martes",
                        "miercoles"
                    ],
                    "horarioIn": "08:00",
                    "horarioOut": "20:00",
                    "tipoComida": [
                        "vegetarioano",
                        "pizza"
                    ],
                    "mesas": 15,
                    "sillasPorMesa": 2,
                    "intervaloMesa": 1,
                    "descripcion": "descricpon del restaruante",
                    "caracteristicasPrinc": [
                        "wifi",
                        "mesasFUera"
                    ],
                    "otrosDetalles": [
                        "casa",
                        "tenedor"
                    ],
                    "costoReserva": 0,
                    "cantidadComentarios": 0,
                    "imagenes": [
                        "http://res.cloudinary.com/dwqu0ohif/image/upload/c_fill,h_1000,w_1000/en5ansx5e4brkwsclq7k",
                        "http://res.cloudinary.com/dwqu0ohif/image/upload/c_fill,h_1000,w_1000/jarluxkjopg217x1yi8p"
                    ],
                    "turnos": 12,
                    "visible": true,
                    "__v": 0
                }
            ]
        }

```

Respuesta no exitosa:

```json

          {
            "msg": "Se presento un error al obtener la lista de restaurantes",
            error
          }
```

## Crear Restaurante

Crea un restaurant en la base de datos.

-   Método:  `POST`
-   Ruta:  `/api/restaurant`

Parámetros de consulta: (Form-Data)

-   `nombre`  (form key, string): nombre del restaurant.
-   `direccion`  (form key, string): direccion del restaurant.
-   `telefono`  (form key, string): telefono del restaurant.
-   `correo`  (form key, string): correo del restaurant
-   `dias`  (form key, string): dias abiertos
-   `horarioIn`  (form key, string): horario de apertura
-   `horarioOut`  (form key, string): horario de cierre
-   `tipoComida`  (form key, string): tipo de comida (gustos)
-   `mesas`  (form key, string): cantidad de mesas del rest.
-   `sillasPorMesa`  (form key, string): cantidad de sillas por mesa.
-   `intervaloMesa`  (form key, string): cantidad de horas que dura una reserva
-   `descripcion`  (form key, string): descripcion del restaurant
-   `caracteristicasPrinc`  (form key, string): caracteristicas del rest.
-   `otrosDetalles`  (form key, string): mas detalles del rest.
-   `images`  (form key, file): imagen del restuarant.

Ejemplo de petición: Form-Data

```

    nombre: 'san Marti',
    direccion: 'las magnolias',
    telefono: '123445567',
    correo: 'gianco@gmail.com',
    dias: "['lunes','martes','miercoles']",
    horarioIn: '08:00',
    horarioOut: '20:00',
    tipoComida: "['vegetarioano','pizza']",
    mesas: '15',
    sillasPorMesa: '2',
    intervaloMesa: '1',
    descripcion: 'descricpon del restaruante',
    caracteristicasPrinc: "['wifi','mesasFUera']",
    otrosDetalles: "['casa','tenedor']"
    images: file1
    images: file2
    images: file3
    images: file4
```

NOTAS IMPORTANTES:

-   Los datos son de manera obligatoria, si no se envian se presentara un error.
  
-   Las Imágenes tienen un min de 1 y un max de 4 por restaurant.
  
-   Los datos de tipo array deben ser enviados como string pero manteniendo su forma de array, como en el ejemplo de arriba.- Ya que, este sera parseado en el backend.

Respuesta exitosa:

```json

  {
    "msg": "creado correctamente"
  }

```

Nombre Repetido:

```json

  {
    "msg": "El restaurante con ese nombre ya existe"
  }

```

Imágenes inexistentes:

```json

  {
    "msg": "No se subio ninguna imagen"
  }
```

## Editar información de restaurante

Editar información del restaurant, de momento no se puede editar imágenes.

-   Método:  `PUT`
-   Ruta:  `/api/restaurant/:id`

Parámetros de consulta:

-   `nombre`  (body, string): costo de la reserva.
-   `direccion`  (body, string): dirección del restaurant.
-   `telefono`  (body, string): teléfono del restaurant.
-   `correo`  (body, string): correo del restaurant
-   `dias`  (body, array(string)): días abiertos
-   `horarioIn`  (body, string): horario de apertura
-   `horarioOut`  (body, string): horario de cierre
-   `tipoComida`  (body, array(string)): tipo de comida (gustos)
-   `mesas`  (body, number): cantidad de mesas del rest.
-   `sillasPorMesa`  (body, number): cantidad de sillas por mesa.
-   `intervaloMesa`  (body, number): cantidad de horas que dura una reserva
-   `descripcion`  (body, string): descripcion del restaurant
-   `caracteristicasPrinc`  (body, array(string)): caracteristicas del rest.
-   `otrosDetalles`  (body, array(string)): mas detalles del rest.
-   `costoReserva`  (body, number): costo de la reserva.
-   `cantidadComentarios`  (body, number): cantidad de Comentarios.
-   `turnos`  (body, number): turnos totales al día.
-   `visible`  (body, string (boolean)): visibilidad del restaurant.

NOTAS IMPORTANTES:

-   Aun no esta la logica para editar imagenes, por lo que no se puede editar imagenes.
  
-   Aun no esta la logica para manejar los comentairios ni el costo de reserva.
  
-   Visible es un boolean, en caso ponerlo en false, el restaurant desaparecera de la lista pero no se eliminara de la base de datos. En caso querer volverlo a true de momento se debe guardar el id para volverlo a editar.

Respuesta exitosa:

```json

  {
    "msg": "Restaurante con id: \"647a83c6207aebd584ae3b5c\" actualizado exitosamente",
    "restaurant": {
        "_id": "647a83c6207aebd584ae3b5c",
        "nombre": "san Ponciano",
        "direccion": "las magnolias",
        "telefono": "123445567",
        "correo": "gianco3108@gmail.com",
        "dias": [
            "lunes",
            "martes",
            "miercoles"
        ],
        "horarioIn": "08:00",
        "horarioOut": "20:00",
        "tipoComida": [
            "vegetarioano",
            "pizza"
        ],
        "mesas": 15,
        "sillasPorMesa": 2,
        "intervaloMesa": 1,
        "descripcion": "descricpon del restaruante",
        "caracteristicasPrinc": [
            "wifi",
            "mesasFUera"
        ],
        "otrosDetalles": [
            "casa",
            "tenedor"
        ],
        "costoReserva": 0,
        "cantidadComentarios": 0,
        "imagenes": [
            "http://res.cloudinary.com/dwqu0ohif/image/upload/c_fill,h_1000,w_1000/en5ansx5e4brkwsclq7k",
            "http://res.cloudinary.com/dwqu0ohif/image/upload/c_fill,h_1000,w_1000/jarluxkjopg217x1yi8p"
        ],
        "turnos": 12,
        "visible": true,
        "__v": 0
    }
}

```

Error id:

```json

  {
    "msg": "Se presento un error al actualizar el retaurante",
    "error": error
 }
```

## Eliminar Restaurante

Eliminar restaurant de la base de datos, esta eliminación es permanente.

-   Método:  `DELETE`
-   Ruta:  `/api/restaurant/:id`


Parámetros de consulta: (query param)

-   `id`  (param): nombre del restaurant.

  

NOTAS IMPORTANTES:

-   El restaurante no será eliminado si este tiene reservas existentes.

Respuesta exitosa:

```json

  { 
    "msg": "Restaurante eliminado exitosamente" 
  }

```

Petición fallida:

```json

  {
    "msg": "Se presento un error al eliminar el restaurante",
    error
  }

```

Reservas Existentes:

```json

  {
    "msg": "No se puede eliminar el restaurante porque tiene reservas, opcion ponerlo quitarle la visibilidad"
  }
```

# API de reserva

## Obtener disponibilidad

Obtiene la cantidad de lugares disponibles por la hora y fecha.

-   Método:  `GET`
-   Ruta:  `/api/restaurant/turnos`

Parámetros de consulta: (Params)

-   `id_restaurante`  (string): Id del restaurant.
-   `fecha`  (string): fecha de busqueda.
-   `turno`  (string): posicion del array de turnos empezando en 0.

NOTAS IMPORTANTES:

-   Turno es un numero, porque es la posicion del array de horas disponibles. Ejm.  
```
turnos : 4
horaI : 12:00
horaO : 20:00
intervalo : 2
[12:00, 14:00, 16:00, 18:00]
```
Ejemplo de petición: query

```
  ruta: ruta/api/restaurant/turnos?id_restaurante=647a83c6207aebd584ae3b5c&fecha=03/06/23&turno=2
```

Respuesta exitosa:

```json

          {
            "disponible": 18
          }

```

Respuesta no exitosa:

```json

          {
            "msg": "Error al obtener turnos disponibles"
          }

```

ID incorrecto:

```json

          {
            "msg": "No se encontró el restaurante,verifique el id del restaurant"
          }

```

No disponible:

```json

          {
            "msg": "Turno no disponible"
          }
```

##  Reservar mesa
Crea la reserva y obtiene los datos.

-   Método:  `POST`
-   Ruta:  `/api/restaurant/turnos`

Parámetros de consulta: (BODY json)

-   `id_restaurante`  (string): Id del restaurant.
-   `correoComensal`  (string): correo de la persona que hará la reserva.
-   `turno`  (number): posición del array de turnos empezando en 0.
-   `comensales`  (number): cantidad de personas que asistiran a la reserva.
-   `fecha`  (string): fecha a reservar.

NOTAS IMPORTANTES:

-   Antes de reservar se debe crear el array con las horas disponibles. Esto se crea al momento que la persona elije la fecha y la hora y se hace el get anterior. Sin este paso, ocurrirá un error  [no existe fecha](http://localhost:3000/reserva.html#noDate).
  
-   Las Reservas se pueden hacer en diferentes dias, pero no en diferentes horarios del mismo dia.

Ejemplo de petición: JSON

```json

          {
            "id_restaurante":"647a83c6207aebd584ae3b5c",
            "correoComensal":"gianco.marquez@gmail.com",
            "turno":1,
            "comensales":5,
            "fecha":"04/06/23"
        }


```

Respuesta exitosa:

```json

          {
            "msg": "Reserva creada con éxito",
            "reserva": {
                "nombreRest": "san Ponciano",
                "hora": "09:00",
                "comensales": 5,
                "fecha": "04/06/23",
                "correoComensal": "gianco.marquez@gmail.com",
                "idReserva": "647be8676ef2fbbb539a467f"
            }
         }

```

Respuesta no exitosa:

```json

          {
            "msg": "Error al obtener turnos disponibles"
          }

```

No existe fecha:

```json

          {
            "msg": "No se encontró la fecha, verifique la fecha"
          }

```

Reserva en el mismo día:

```json

          {
            "msg": "Error al reservar, ya tienes una reserva registrada para esa fecha"
          }

```

## Ver reservas

Muestra todas las reservas de la persona en un array

-   Método:  `GET`
-   Ruta:  `/api/reservas`

Parámetros de consulta: (QUERY params)

-   `correo`  (string): correo de la persona.

Ejemplo de petición: query
```
ruta/api/reservas?correo=gianco.marquez@gmail.com
```
Respuesta exitosa:

```json

          {
            "msg": "Reservas obtenidas exitosamente",
            "reservas": [
                {
                    "_id": "647a974721f839fe59b85dbd",
                    "hora": "09:00",
                    "nombre": "san Ponciano",
                    "comensales": 5,
                    "fecha": "03/06/23",
                    "estado": [
                        "confirmada"
                    ],
                    "correoComensal": "correo@gmail.com",
                    "id_restaurante": "647a83c6207aebd584ae3b5c",
                    "__v": 0
                },
                {
                    "_id": "647be8676ef2fbbb539a467f",
                    "hora": "09:00",
                    "nombre": "san Ponciano",
                    "comensales": 5,
                    "fecha": "04/06/23",
                    "estado": [
                        "confirmada"
                    ],
                    "correoComensal": "correo@gmail.com",
                    "id_restaurante": "647a83c6207aebd584ae3b5c",
                    "__v": 0
                }
            ]
        }

```

Respuesta no exitosa:

```json

          {
            "msg": "Se presento un error al obtener las reservas",
            error
          }

```

No se encontraron reservas o el correo es erroneo:

```json

          {
           "msg": "No se encontraron reservas, verificar el correo"
           }
```

## Editar reservas


## Eliminar reservas
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY2MTIxNzc0LDE5MDE0MzcyMTAsMzg4OT
kyMjIsMTQ4OTg5NjI4MywyMDU1MjA3MzEzLC0yMzU4ODE5MDEs
NzE2OTE4NTU5LC0xNzExNjIxMzAxLDQ5MzUwNDU0MV19
-->