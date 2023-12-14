package ru.lprcup.backend.service.impl;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.repository.GradeRepository;
import ru.lprcup.backend.repository.UserRepository;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.converters.GradeConverter;
import ru.lprcup.backend.service.converters.UserConverter;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.RoleDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

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
                result.add(gradeConverter.toDto(grade));
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
}
