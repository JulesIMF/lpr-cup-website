package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private Long id;
    private UserDto fromUser;
    private DialogDto dialog;
    private LocalDateTime time;
    private String text;
    private FileDto file;
}
