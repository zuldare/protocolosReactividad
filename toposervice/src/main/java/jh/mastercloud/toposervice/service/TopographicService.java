package jh.mastercloud.toposervice.service;

import jh.mastercloud.toposervice.CityNotFoundException;
import jh.mastercloud.toposervice.dto.TopographicDetailsDto;
import jh.mastercloud.toposervice.model.Landscape;
import jh.mastercloud.toposervice.model.TopographicInfo;
import jh.mastercloud.toposervice.repository.TopographicInfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Service
@Slf4j
public class TopographicService {
    private static final String MADRID = "Madrid";
    private static final String GRANADA = "Granada";
    private static final String VALLADOLID = "Valladolid";
    private final TopographicInfoRepository repo;
    private final ModelMapper mapper;

    public TopographicService(TopographicInfoRepository repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @PostConstruct
    public void initDataBase(){
        log.info("======> Initializing MongoDB database <========");
        this.repo.deleteAll();
        this.repo.saveAll(Arrays.asList(TopographicInfo.builder().id(MADRID).landscape(Landscape.FLAT.getLabel()).build(),
                TopographicInfo.builder().id(GRANADA).landscape(Landscape.MOUNTAIN.getLabel()).build(),
                TopographicInfo.builder().id(VALLADOLID).landscape(Landscape.FLAT.getLabel()).build()));
    }

    public TopographicDetailsDto getTopographicDetails(String city) {
        log.info("Getting topographic details for city: {}", city);
        return mapper.map(this.repo.findById(city).orElseThrow(CityNotFoundException::new), TopographicDetailsDto.class);
    }
}
