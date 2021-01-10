const grpc = require('grpc');
const WeatherService = require('./interface.js');
const weatherServiceImpl = require('./weatherService.js');
const URL = '127.0.0.1:9090';

const server = new grpc.Server();

server.addService(WeatherService.service, weatherServiceImpl);
console.log(`Creating  gRPC server on URL : ${URL}`);
server.bind(`${URL}`, grpc.ServerCredentials.createInsecure());
console.log(`===> gRPC server RUNNING on URL : ${URL}`);

server.start();