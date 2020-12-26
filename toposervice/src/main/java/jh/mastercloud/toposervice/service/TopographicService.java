package jh.mastercloud.toposervice.service;

import jh.mastercloud.toposervice.CityNotFoundException;
import jh.mastercloud.toposervice.dto.TopographicDetailsDto;
import jh.mastercloud.toposervice.model.Landscape;
import jh.mastercloud.toposervice.model.City;
import jh.mastercloud.toposervice.repository.CityRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.util.Random;

@Service
@Slf4j
public class TopographicService {
    private static final String MADRID = "Madrid";
    private static final String PARIS = "Paris";
    private static final String LONDON = "London";
    private static final String ROME = "Rome";
    private final CityRepository repo;

    public TopographicService(CityRepository repo) {
        this.repo = repo;
    }

    @PostConstruct
    public void initDataBase() throws InterruptedException {
        log.info("======> Deleting MongoDB database <========");
        this.repo.deleteAll().block();

        log.info("======> Initializing MongoDB database <========");
        this.repo.save(City.builder().name(MADRID).landscape(Landscape.FLAT).build()).block();
        this.repo.save(City.builder().name(PARIS).landscape(Landscape.MOUNTAIN).build()).block();
        this.repo.save(City.builder().name(ROME).landscape(Landscape.MOUNTAIN).build()).block();
        this.repo.save(City.builder().name(LONDON).landscape(Landscape.FLAT).build()).block();

    }

    public Mono<TopographicDetailsDto> getTopographicDetails(String city) throws InterruptedException {
        log.info("Getting topographic details for city: {}", city);

        return this.repo.findByNameIgnoreCase(city)
                .map(city1 -> TopographicDetailsDto.builder()
                        .id(city1.getName())
                        .landscape(city1.getLandscape().toString())
                        .build())
                .switchIfEmpty(Mono.error(new CityNotFoundException()));
    }

    private int generateRandomNumberBetween(int min, int max){
        return new Random().ints(min,max).findFirst().getAsInt();
    }
}
