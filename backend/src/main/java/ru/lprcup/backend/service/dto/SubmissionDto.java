package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.lprcup.backend.data.Dialog;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDto {
    private Long id;
    private EpisodeDto episode;
    private UserDto student;
    private MessageDto message;
    private Long number;
    private List<VerdictDto> verdicts;
}
