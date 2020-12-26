package jh.mastercloud.toposervice.controller;

import jh.mastercloud.toposervice.repository.CityRepository;
import jh.mastercloud.toposervice.service.TopographicService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;


@ExtendWith(SpringExtension.class)
@WebFluxTest(controllers = TopographicController.class)
@Import(TopographicService.class)
class TopographicControllerTest {

    @Autowired
    private TopographicController topographicController;

    @Autowired
    private ModelMapper modelMapper;

    @MockBean
    private CityRepository repo;

    @Test
    void testGetTopographicDetails(){

//        WebTestClient client = WebTestClient.bindToController(topographicController).build();
//
//        client.get().uri("/api/topographicdetails/Madrid")
//                .accept(MediaType.APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isOk()
//                .expectHeader().contentType(MediaType.APPLICATION_JSON)
//                .expectBody()
//                .jsonPath("$.id()").isEqualTo("Madrid")
//                .jsonPath("$.landscape()").isEqualTo("flat");
    }
}