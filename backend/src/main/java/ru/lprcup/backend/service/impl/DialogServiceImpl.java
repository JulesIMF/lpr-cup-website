/*
 * Filename: /home/jules_imf/source/doroshenkoiv-project/backend/src/main/java/ru/lprcup/backend/service/impl/GradeServiceImpl copy.java
 * Path: /home/jules_imf/source/doroshenkoiv-project/backend/src/main/java/ru/lprcup/backend/service/impl
 * Created Date: Friday, December 15th 2023, 12:24:31 pm
 * Author: JulesIMF
 *
 * Copyright (c) 2023 Your Company
 */
package ru.lprcup.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.repository.DialogRepository;
import ru.lprcup.backend.repository.EpisodeRepository;
import ru.lprcup.backend.repository.GradeRepository;
import ru.lprcup.backend.service.api.DialogService;
import ru.lprcup.backend.service.converters.DialogConverter;
import ru.lprcup.backend.service.converters.EpisodeConverter;
import ru.lprcup.backend.service.converters.GradeConverter;
import ru.lprcup.backend.service.converters.UserConverter;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DialogServiceImpl implements DialogService {
    private final GradeRepository gradeRepository;
    private final GradeConverter gradeConverter;

    private final DialogRepository dialogRepository;
    private final DialogConverter dialogConverter;

    private final EpisodeRepository episodeRepository;
    private final EpisodeConverter episodeConverter;

    private final UserConverter userConverter;

    @Override
    public DialogDto getAdminDialog(UserDto user, Long season, Long grade, Long episode) {
        var registered = false;
        for (var gr : user.getGrades()) {
            if (gr.getSeason() == season && gr.getNumber() == grade) {
                registered = true;
                break;
            }
        }

        if (!registered) {
            return null;
        }

        var gr = gradeRepository.findByNumberAndSeason(grade, season);

        if (gr == null) {
            return null;
        }

        var ep = episodeRepository.findByNumberAndGrade(episode, gr);
        if (ep == null) {
            return null;
        }

        var dialog = dialogRepository.findByStudentAndEpisode(userConverter.toEntity(user), ep);
        if (dialog != null) {
            return dialogConverter.toDto(dialog);
        }

        dialog = new Dialog();
        dialog.setStudent(userConverter.toEntity(user));
        dialog.setEpisode(ep);
        return dialogConverter.toDto(dialogRepository.save(dialog));
    }

    @Override
    public List<DialogDto> getStudentDialogs(Long season, Long grade, Long episode) {
        var gr = gradeRepository.findByNumberAndSeason(grade, season);

        if (gr == null) {
            return null;
        }

        var ep = episodeRepository.findByNumberAndGrade(episode, gr);
        if (ep == null) {
            return null;
        }

        var list = new ArrayList<DialogDto>();
        for (var d : ep.getDialogs()) {
            list.add(dialogConverter.toDto(d));
        }

        return list;
    }
}
