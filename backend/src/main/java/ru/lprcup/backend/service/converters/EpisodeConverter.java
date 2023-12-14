package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.TaskDto;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class EpisodeConverter {
    public EpisodeDto toDto(Episode episode) {
        EpisodeDto episodeDto = new EpisodeDto();
        episodeDto.setId(episode.getId());

        var gradeConverter = new GradeConverter();
        episodeDto.setGrade(gradeConverter.toDto(episode.getGrade()));

        episodeDto.setNumber(episode.getNumber());

        ArrayList<TaskDto> tasks = new ArrayList<TaskDto>();
        var taskConverter = new TaskConverter();
        for (var task : episode.getTasks()) {
            tasks.add(taskConverter.toDto(task));
        }
        episodeDto.setTasks(tasks.stream().toList());

        ArrayList<DialogDto> dialogs = new ArrayList<DialogDto>();
        var dialogConverter = new DialogConverter();
        for (var dialog : episode.getDialogs()) {
            dialogs.add(dialogConverter.toDto(dialog));
        }
        episodeDto.setDialogs(dialogs.stream().toList());

        return episodeDto;
    }

    public Episode toEntity(EpisodeDto episodeDto) {
        Episode episode = new Episode();
        episode.setId(episodeDto.getId());

        var gradeConverter = new GradeConverter();
        episode.setGrade(gradeConverter.toEntity(episodeDto.getGrade()));

        episode.setNumber(episodeDto.getNumber());

        ArrayList<Task> tasks = new ArrayList<Task>();
        var taskConverter = new TaskConverter();
        for (var task : episodeDto.getTasks()) {
            tasks.add(taskConverter.toEntity(task));
        }
        episode.setTasks(tasks.stream().toList());

        ArrayList<Dialog> dialogs = new ArrayList<Dialog>();
        var dialogConverter = new DialogConverter();
        for (var dialog : episodeDto.getDialogs()) {
            dialogs.add(dialogConverter.toEntity(dialog));
        }
        episode.setDialogs(dialogs.stream().toList());

        return episode;
    }
}