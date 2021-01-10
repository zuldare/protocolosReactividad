# WeatherService

* Offers gRPC API where a city name is received as parameter and should return 'Rainy' or 'Sunny'.
* Implemented in node.
* 'Rainy' is to be obtained when city starts with vocal, 'Sunny' otherwise.
* A random 1-3 seconds delay will be used as timeOut.
* gRPC API format will be
``` 
service WeatherService {
    rpc GetWeather(GetWeatherRequest) returns (Weather);
}
message GetWeatherRequest {
    string city = 1;
}
message Weather {
    string city = 1;
    string weather = 2;
}
```

## gRPC ROOT URL 
```
    http://localhost:9090
```

## Examples of use

### Sunny
* Request 
```json
{ "city": "Madrid" }
```
* Response
```json
{
  "city": "Madrid",
  "weather": "Sunny"
}
```

### Rainy
* Request
```json
{ "city": "Ibiza" }
```
* Response
```json
{
  "city": "Ibiza",
  "weather": "Rainy"
}
```

# Usage
```  
$ npm install
$ npm start
```


### Author

Jose Jaime Hernández Ortiz [github](https://github.com/zuldare)