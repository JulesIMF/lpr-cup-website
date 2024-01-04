package ru.lprcup.backend.service.api;

import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.List;


public interface EpisodeService {
    void addNewEpisode(NewEpisodeParams params);

    public static class NewEpisodeParams {
        public static class TaskParams {
            public String name;
            public Double weight;
        }
        public Long season;
        public Long grade;
        public TaskParams[] tasks;
    }
}
