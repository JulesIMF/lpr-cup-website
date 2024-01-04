package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.TaskDto;

@Component
@RequiredArgsConstructor
public class TaskConverter {
    public TaskDto toDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());

        if (taskDto.getEpisode() != null) {
            var episode = new EpisodeDto();
            episode.setId(task.getEpisode().getId());
            episode.setNumber(task.getEpisode().getNumber());
            taskDto.setEpisode(episode);
        }

        taskDto.setName(task.getName());
        return taskDto;
    }

    public Task toEntity(TaskDto taskDto) {
        Task task = new Task();
        task.setId(taskDto.getId());

        if (task.getEpisode() != null) {
            var episode = new Episode();
            episode.setId(task.getEpisode().getId());
            episode.setNumber(task.getEpisode().getNumber());
            task.setEpisode(episode);
        }

        task.setName(taskDto.getName());
        return task;
    }
}