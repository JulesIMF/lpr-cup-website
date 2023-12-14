package ru.lprcup.backend.service.converters;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.data.Verdict;
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

        var episodeConverter = new EpisodeConverter();
        taskDto.setEpisode(episodeConverter.toDto(task.getEpisode()));

        taskDto.setName(task.getName());
        return taskDto;
    }

    public Task toEntity(TaskDto taskDto) {
        Task task = new Task();
        task.setId(taskDto.getId());

        var episodeConverter = new EpisodeConverter();
        task.setEpisode(episodeConverter.toEntity(taskDto.getEpisode()));

        task.setName(taskDto.getName());
        return task;
    }
}