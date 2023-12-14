package ru.lprcup.backend.service.converters;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.service.dto.GradeDto;

@Component
@RequiredArgsConstructor
public class GradeConverter {
    public GradeDto toDto(Grade grade) {
        GradeDto gradeDto = new GradeDto();
        gradeDto.setId(grade.getId());
        gradeDto.setNumber(grade.getNumber());
        gradeDto.setSeason(grade.getSeason());
        return gradeDto;
    }

    public Grade toEntity(GradeDto gradeDto) {
        Grade grade = new Grade();
        grade.setId(gradeDto.getId());
        grade.setNumber(gradeDto.getNumber());
        grade.setSeason(gradeDto.getSeason());
        return grade;
    }
}
