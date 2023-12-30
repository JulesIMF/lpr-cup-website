package ru.lprcup.backend.service.api;

import java.util.Set;
import java.util.List;

import ru.lprcup.backend.service.dto.GradeDto;

public interface GradeService {
    public Set<GradeDto> getActualGrades(List<Long> participationGrades);
    public List<GradeDto> getAllGrades();
    public Long getEpisodesCount(Long season, Long grade);

    public static class NewSeasonParams {
        public Long season;
        public Long year;
    }
    public void addNewSeason(NewSeasonParams params);
}
