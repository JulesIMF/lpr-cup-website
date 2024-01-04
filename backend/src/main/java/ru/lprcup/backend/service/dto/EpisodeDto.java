package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
