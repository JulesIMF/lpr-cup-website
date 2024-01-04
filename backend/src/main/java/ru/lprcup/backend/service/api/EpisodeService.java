package ru.lprcup.backend.service.api;

public interface EpisodeService {
    void addNewEpisode(NewEpisodeParams params);

    public static class NewEpisodeParams {
        public Long season;
        public Long grade;
        public TaskParams[] tasks;

        public static class TaskParams {
            public String name;
            public Double weight;
        }
    }
}
