package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerdictDto {
    private Long id;
    private SubmissionDto submission;
    private TaskDto task;
    private String code;
}
