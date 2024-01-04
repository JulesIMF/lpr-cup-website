package ru.lprcup.backend.service.api;

import ru.lprcup.backend.service.dto.GradeDto;

import java.util.List;
import java.util.Set;

public interface GradeService {
    public Set<GradeDto> getActualGrades(List<Long> participationGrades);

    public List<GradeDto> getAllGrades();

    public Long getEpisodesCount(Long season, Long grade);

    public void addNewSeason(NewSeasonParams params);

    public static class NewSeasonParams {
        public Long season;
        public Long year;
    }
}
