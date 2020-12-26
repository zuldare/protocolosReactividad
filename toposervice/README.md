# TopoService

* Offers an APIREST where given a city as parameter returns the landscape of it.

### Usage
* Previous installation of JDK11, maven and Docker is mandatory.

``` 
$ docker run --rm -p 27017:27017 -d mongo:latest 
$ mvn spring-boot:run    
```

* When application launches (on port *8080*) it creates automatically the following cities <-> landscapes.

| City    | Landscape   |
| ------- | ----------- |
| MADRID  | flat        |
| PARIS   | mountain    |
| ROME    | mountain    |
| LONDON  | flat        |

### Endpoint

#### GET /api/topographicdetails/{city}

This call will retrieve

| Status | Info                           | Response  |
| ------ | -----------------------------  | --------- |
| 404    | City not found                 | `json`                                            |
|        |                                | ` {`                                              |
|        |                                | ` "timestamp": "2020-12-26T15:40:41.008+00:00",`  |
|        |                                | ` "path": "/api/topographicdetails/Peru",`        |
|        |                                | ` "status": 404,`                                 |
|        |                                | ` "error": "Not Found",`                          |
|        |                                | ` "message": "City not found",`                   |
|        |                                | `}`                                               |
| 200    | Topographic info of the city   |                                                   |
|        |                                | `json`                                            |
|        |                                | ` { `                                             |
|        |                                | `   "id" : "Madrid" `                             |
|        |                                | `   "landscape": "flat" `                         |
|        |                                | ` }`                                              |


### Author

Jaime Hernández Ortiz [github](https://github.com/zuldare)