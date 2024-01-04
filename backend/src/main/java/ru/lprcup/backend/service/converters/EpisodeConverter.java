package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.TaskDto;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class EpisodeConverter {
    public EpisodeDto toDto(Episode episode) {
        EpisodeDto episodeDto = new EpisodeDto();
        episodeDto.setId(episode.getId());

        var grade = new GradeDto();
        if (episode.getGrade() != null) {
            grade.setId(episode.getGrade().getId());
            grade.setNumber(episode.getGrade().getNumber());
            grade.setSeason(episode.getGrade().getSeason());
            grade.setYear(episode.getGrade().getYear());
            episodeDto.setGrade(grade);
        }

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

        if (episodeDto.getGrade() != null) {
            var grade = new Grade();
            grade.setId(episodeDto.getGrade().getId());
            grade.setNumber(episodeDto.getGrade().getNumber());
            grade.setSeason(episodeDto.getGrade().getSeason());
            grade.setYear(episodeDto.getGrade().getYear());
            episode.setGrade(grade);
        }

        episode.setNumber(episodeDto.getNumber());

        ArrayList<Task> tasks = new ArrayList<Task>();
        var taskConverter = new TaskConverter();
        for (var task : episodeDto.getTasks()) {
            tasks.add(taskConverter.toEntity(task));
        }
        episode.setTasks(tasks.stream().toList());

        ArrayList<Dialog> dialogs = new ArrayList<Dialog>();
        var dialogConverter = new DialogConverter();
        if (episodeDto.getDialogs() != null) {
            for (var dialog : episodeDto.getDialogs()) {
                dialogs.add(dialogConverter.toEntity(dialog));
            }
        }

        episode.setDialogs(dialogs.stream().toList());

        return episode;
    }
}