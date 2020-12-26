package jh.mastercloud.toposervice.controller;

import jh.mastercloud.toposervice.dto.TopographicDetailsDto;
import jh.mastercloud.toposervice.service.TopographicService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/topographicdetails", produces = MediaType.APPLICATION_JSON_VALUE)
public class TopographicController {

    private final TopographicService topographicService;

    public TopographicController(TopographicService topographicService) {
        this.topographicService = topographicService;
    }

    @GetMapping("/{city}")
    public Mono<TopographicDetailsDto> getTopographicDetails(@PathVariable("city")String city) throws InterruptedException {

        return this.topographicService.getTopographicDetails(city);
    }
}
