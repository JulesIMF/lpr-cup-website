package ru.lprcup.backend.service.dto;

import ru.lprcup.backend.data.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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
