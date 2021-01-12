package jh.mastercloud.planner.services;

import jh.mastercloud.planner.clients.TopoServiceWebClient;
import jh.mastercloud.planner.dto.TopoServiceResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class TopoService {
    private TopoServiceWebClient topoServiceWebClient;

    public TopoService(TopoServiceWebClient topoServiceWebClient) {
        this.topoServiceWebClient = topoServiceWebClient;
    }

    @Async
    public CompletableFuture<String> getCityLandscape(String city) {
        log.debug("Getting landscape for city {}", city);
        TopoServiceResponseDto cityResponseDto = this.topoServiceWebClient.getLandscape(city).block();
        return CompletableFuture.completedFuture(cityResponseDto.getLandscape());
    }
}
