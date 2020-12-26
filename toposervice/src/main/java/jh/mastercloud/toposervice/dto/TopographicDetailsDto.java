package jh.mastercloud.toposervice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TopographicDetailsDto {
    private String id;
    private String landscape;
}
