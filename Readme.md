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

```

          {
            msg: 'Se presento un error al obtener la lista de restaurantes',
            error
          }
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMjU1ODcxOTcsMzg4OTkyMjIsMTQ4OT
g5NjI4MywyMDU1MjA3MzEzLC0yMzU4ODE5MDEsNzE2OTE4NTU5
LC0xNzExNjIxMzAxLDQ5MzUwNDU0MV19
-->