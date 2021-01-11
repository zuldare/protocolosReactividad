# Server

## Cliente

* Se servirá por http como estático en el servidor web del Server.
* Se implementará como AJAX: Código JavaScript llamando a la API REST y
al endpoint de WebSockets de Server. Se puede asumir que el browser es
moderno y dispone de librerías de alto nivel como fetch. Aunque se puede
usar alguna librería externa si se considera útil.
* La web del cliente mostrará las plantas del server y el progreso de cada una
en el momento de la consulta.
* También proporcionará un formulario para incluir una ciudad y un botón para
crear una planta en esa ciudad. Cuando se pulse el botón el botón de crear
se realizará una petición REST al Server para solicitar la creación de la
planta. La respuesta a esa petición de creación retornará inmediatamente
devolviendo el recurso con un progreso de 0%. La creación progresará en el
server durante varios segundos adicionales.
* A medida que avance la creación el Client recibirá mensajes por el
websocket con el progreso. La página web deberá mostrar ese progreso.
Basta con que sea un texto como “Progress: 0%” que va cambiando de valor.
* La interfaz sólo permitirá crear una creación de una planta eólica a la vez.
Para ello deshabilitará el botón hasta que se haya creado.
* Cuando llegue el mensaje de que el progreso de creación de la planta es
100% se actualizará la lista de plantas para que aparezca la nueva planta.
* La web estará disponible en la ruta raíz del servidor web
http://127.0.0.1:3000/
  
## Server

* Ofrecerá una API REST para crear, listar y borrar plantas eólicas.
* Se implementará con Node.js y con una base de datos MySQL.
* Una planta se crea con el nombre de una ciudad. El resultado de la creación
de una planta eólica será una planificación en forma de texto.
  
    * Creación
        * URL: /api/eoloplants
        * Method: POST
        * Request Body: ```{ "city": "Madrid" }```
        * Response Body: ```{ "id": 1, "city": "Madrid",
        "progress": 0, "completed": false, "planning":
        null }```

    * Consulta
    * URL: /api/eoloplants/1
    * Method: GET
    * Response Body: ```{ "id": 1, "city": "Madrid",
    "progress": 100, "completed": true, "planning":
    "madrid-sunny-flat" }```
      
* Cada vez que se crea una planta, se enviará el mensaje de creación en una
cola de RabbitMQ (eoloplantCreationRequests) con el siguiente formato:
    ```{ "id": 1, "city": "Madrid" }```
* Los mensajes de progreso los recibirá el server en la cola
eoloplantCreationProgressNotifications con el siguiente formato:
```{ "id": 1, "city": "Madrid", "progress": 50, "completed": false, "planning": null }```
```{ "id": 1, "city": "Madrid", "progress": 100, "completed": true, "planning": "madrid-sunny-flat" }```

* Cada vez que el Server reciba un mensaje de progreso del Planner lo deberá
reenviar al cliente mediante WebSockets para que actualice el interfaz.
* La base de datos guardará las plantas y su progreso de creación. Los
posibles valores para el progreso de creación son: 0, 25, 50, 75, 100.
* El servidor deberá soportar la creación de varias plantas en paralelo
solicitadas por varios usuarios (se podrá simular desde varias pestañas del
navegador). No deberá haber interferencias entre ellas.
* Las colas necesarias para la comunicación con el Planner las crearán tanto
el Server como el Planner al arrancar. Esto permite que no importe el orden
de arranque.
  

## Uso
```json
$ docker run --rm -p 5672:5672 -p 15672:15672 rabbitmq:3-management
$ docker run --rm -p 3306:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=eoloplants -e -d mysql:latest
$ npm install
$ npm start
```

## URLs

* Cliente: ```http://localhost:3000/```
* API: ```http://localhost:3000/api/eoloplants```
* Websocket: ```ws://localhost:3000/notifications```

## Endpoints

* Get all plants: ```GET http://localhost:3000/api/eoloplants``` 
* Get plant by id: ```GET http://localhost:3000/api/eoloplants/1```
* Post plant: ```POST http://localhost:3000/api/eoloplants/```  with body ```{"city": "Madrid"}```
* Delete plant by id: ```DELETE http://localhost:3000/api/eoloplants/1```
