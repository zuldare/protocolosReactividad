package jh.mastercloud.toposervice.controller;

import jh.mastercloud.toposervice.dto.TopographicDetailsDto;
import jh.mastercloud.toposervice.service.TopographicService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/topographicdetails", produces = MediaType.APPLICATION_JSON_VALUE)
public class TopographicController {

    private final TopographicService topographicService;

    public TopographicController(TopographicService topographicService) {
        this.topographicService = topographicService;
    }

    @GetMapping("/{city}")
    public TopographicDetailsDto getTopographicDetails(@PathVariable("city")String city){
        return this.topographicService.getTopographicDetails(city);
    }
    /*
    evolverá “Flat” o “Mountain”.
■ Consulta
● URL: /api/topographicdetails/Madrid
● Method: GET
● Response Body: { "id": "Madrid", "landscape":
"flat" }
○ Se implementará en Java c
     */
}
