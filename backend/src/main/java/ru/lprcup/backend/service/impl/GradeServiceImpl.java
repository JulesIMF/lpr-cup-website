package ru.lprcup.backend.service.impl;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.repository.GradeRepository;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.converters.GradeConverter;
import ru.lprcup.backend.service.dto.GradeDto;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {
    private final GradeRepository gradeRepository;
    private final GradeConverter gradeConverter;

    public Set<GradeDto> getActualGrades(List<Long> participationGrades) {
        var result = new HashSet<GradeDto>();

        for (var pg : participationGrades) {
            var grade = gradeRepository.findByNumberAndMaxYear(pg);
            if (grade != null) {
                var gradeDto = gradeConverter.toDto(grade);
                for (var ep : gradeDto.getEpisodes()) {
                    ep.setDialogs(null);
                    ep.setGrade(null);
                }
                result.add(gradeDto);
            }
        }

        return result;
    }

    public Long getEpisodesCount(Long season, Long grade) {
        var gradeEntity = gradeRepository.findByNumberAndSeason(grade, season);
        if (gradeEntity == null)
            return -1l;
        
        var episodes = gradeEntity.getEpisodes();
        return episodes != null ? episodes.size() : 0l;
    }

    @Override
    public void addNewSeason(NewSeasonParams params) {
        for (long gradeNo = 9L; gradeNo <= 11; gradeNo++) {
            var grade = new Grade();
            grade.setSeason(params.season);
            grade.setNumber(gradeNo);
            grade.setYear(params.year);
            gradeRepository.save(grade);
        }
    }

    @Override
    public List<GradeDto> getAllGrades() {
        var grades = gradeRepository.findAll();
        var result = new ArrayList<GradeDto>();
        for (var g : grades) {
            result.add(gradeConverter.toDto(g));
        }

        return result;
    }
}
