package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.GradeDto;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class GradeConverter {
    public GradeDto toDto(Grade grade) {
        GradeDto gradeDto = new GradeDto();
        gradeDto.setId(grade.getId());
        gradeDto.setNumber(grade.getNumber());
        gradeDto.setYear(grade.getYear());
        gradeDto.setSeason(grade.getSeason());

        ArrayList<EpisodeDto> episodes = new ArrayList<EpisodeDto>();
        var episodeConverter = new EpisodeConverter();
        if (grade.getEpisodes() != null) {
            for (var episode : grade.getEpisodes()) {
                episodes.add(episodeConverter.toDto(episode));
            }
        }
        gradeDto.setEpisodes(episodes.stream().toList());

        return gradeDto;
    }

    public Grade toEntity(GradeDto gradeDto) {
        Grade grade = new Grade();
        grade.setId(gradeDto.getId());
        grade.setNumber(gradeDto.getNumber());
        grade.setYear(gradeDto.getYear());
        grade.setSeason(gradeDto.getSeason());

        ArrayList<Episode> episodes = new ArrayList<Episode>();
        var episodeConverter = new EpisodeConverter();
        if (gradeDto.getEpisodes() != null) {
            for (var episode : gradeDto.getEpisodes()) {
                episodes.add(episodeConverter.toEntity(episode));
            }
        }
        grade.setEpisodes(episodes.stream().toList());

        return grade;
    }
}
