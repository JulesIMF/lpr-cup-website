package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeDto {
    private Long id;
    private Long number;
    private Long year;
    private Long season;
    private List<EpisodeDto> episodes;
}
