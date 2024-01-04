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
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.repository.DialogRepository;
import ru.lprcup.backend.repository.EpisodeRepository;
import ru.lprcup.backend.repository.GradeRepository;
import ru.lprcup.backend.repository.TaskRepository;
import ru.lprcup.backend.service.api.EpisodeService;
import ru.lprcup.backend.service.converters.DialogConverter;
import ru.lprcup.backend.service.converters.EpisodeConverter;
import ru.lprcup.backend.service.converters.GradeConverter;
import ru.lprcup.backend.service.converters.UserConverter;

@Service
@RequiredArgsConstructor
public class EpisodeServiceImpl implements EpisodeService {
    private final GradeRepository gradeRepository;
    private final GradeConverter gradeConverter;

    private final DialogRepository dialogRepository;
    private final DialogConverter dialogConverter;

    private final EpisodeRepository episodeRepository;
    private final EpisodeConverter episodeConverter;

    private final UserConverter userConverter;

    private final TaskRepository taskRepository;

    @Override
    public void addNewEpisode(NewEpisodeParams params) {
        var episode = new Episode();
        var grade = gradeRepository.findByNumberAndSeason(params.grade, params.season);
        episode.setGrade(grade);
        var last = episodeRepository.findFirstByGradeOrderByNumberDesc(grade);

        var number = (last == null) ? 1 : last.getNumber() + 1;
        episode.setNumber(number);
        episode = episodeRepository.save(episode);

        for (var taskParams : params.tasks) {
            var task = new Task();
            task.setName(taskParams.name);
            task.setWeight(taskParams.weight);
            task.setEpisode(episode);
            taskRepository.save(task);
        }


    }
}
