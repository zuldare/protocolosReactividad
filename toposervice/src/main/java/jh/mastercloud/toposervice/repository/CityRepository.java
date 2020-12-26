package jh.mastercloud.toposervice.repository;

import jh.mastercloud.toposervice.model.City;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface CityRepository extends ReactiveMongoRepository<City, String> {

    Mono<City> findByNameIgnoreCase (String cityName);
}
