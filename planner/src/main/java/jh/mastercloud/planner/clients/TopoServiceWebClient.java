package jh.mastercloud.planner.clients;

import jh.mastercloud.planner.dto.TopoServiceResponseDto;
import jh.mastercloud.planner.exceptions.TopoServiceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class TopoServiceWebClient {

    private WebClient webClient;

    public TopoServiceWebClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<TopoServiceResponseDto> getLandscape(String city) {
        return this.webClient.get().uri("/{city}", city)
                .retrieve()
                .onStatus(httpStatus -> HttpStatus.NOT_FOUND.equals(httpStatus),
                        clientResponse -> Mono.error(TopoServiceNotFoundException::new))
                .bodyToMono(TopoServiceResponseDto.class);
    }
}
