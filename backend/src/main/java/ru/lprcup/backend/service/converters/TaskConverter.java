package ru.lprcup.backend.service.converters;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.data.Verdict;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.TaskDto;
import ru.lprcup.backend.service.dto.VerdictDto;

@Component
@RequiredArgsConstructor
public class TaskConverter {
    public TaskDto toDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());

        var episode = new EpisodeDto();
        episode.setId(task.getEpisode().getId());
        episode.setNumber(task.getEpisode().getNumber());
        taskDto.setEpisode(episode);

        taskDto.setName(task.getName());
        return taskDto;
    }

    public Task toEntity(TaskDto taskDto) {
        Task task = new Task();
        task.setId(taskDto.getId());

        var episode = new Episode();
        episode.setId(task.getEpisode().getId());
        episode.setNumber(task.getEpisode().getNumber());
        task.setEpisode(episode);

        task.setName(taskDto.getName());
        return task;
    }
}