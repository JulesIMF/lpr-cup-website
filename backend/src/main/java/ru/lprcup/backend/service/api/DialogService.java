package ru.lprcup.backend.service.api;

import java.util.Set;

import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.List;


public interface DialogService {
    public DialogDto getAdminDialog(UserDto user, Long season, Long grade, Long episode);
    public List<DialogDto> getStudentDialogs(Long season, Long grade, Long episode);
}
