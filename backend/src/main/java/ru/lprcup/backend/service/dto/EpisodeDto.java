package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EpisodeDto {
    private Long id;
    private GradeDto grade;
    private Long number;
    private List<TaskDto> tasks;
    private List<DialogDto> dialogs;
}
