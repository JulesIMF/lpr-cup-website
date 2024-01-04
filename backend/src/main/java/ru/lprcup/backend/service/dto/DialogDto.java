package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DialogDto {
    private Long id;
    private EpisodeDto episode;
    private UserDto student;
    private LocalDateTime lastMessage;
    private LocalDateTime lastSubmission;
    private List<MessageDto> messages;
}
