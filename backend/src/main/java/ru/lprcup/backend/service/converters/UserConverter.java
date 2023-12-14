package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Role;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.service.dto.RoleDto;
import ru.lprcup.backend.service.dto.UserDto;
import ru.lprcup.backend.service.dto.GradeDto;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class UserConverter {
    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setSurname(user.getSurname());
        userDto.setName(user.getName());
        userDto.setPatronymic(user.getPatronymic());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setIsAdmin(user.getIsAdmin());

        ArrayList<RoleDto> roles = new ArrayList<RoleDto>();
        var roleConverter = new RoleConverter();
        for (Role role : user.getRoles()) {
            roles.add(roleConverter.toDto(role));
        }
        userDto.setRoles(roles.stream().toList());

        if (user.getGrades() != null) {
            var gradeConverter = new GradeConverter();
            HashSet<GradeDto> grades = new HashSet<GradeDto>();
            for (var grade : user.getGrades()) {
                grades.add(gradeConverter.toDto(grade));
            }
            userDto.setGrades(grades);
        }

        return userDto;
    }

    public User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        User user = new User();
        user.setId(userDto.getId());
        user.setSurname(userDto.getSurname());
        user.setName(userDto.getName());
        user.setPatronymic(userDto.getPatronymic());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setIsAdmin(userDto.getIsAdmin());

        ArrayList<Role> roles = new ArrayList<Role>();
        var roleConverter = new RoleConverter();
        for (RoleDto role : userDto.getRoles()) {
            roles.add(roleConverter.toEntity(role));
        }
        user.setRoles(roles.stream().toList());

        HashSet<Grade> grades = new HashSet<Grade>();
        var gradeConverter = new GradeConverter();
        if (userDto.getGrades() != null) {
            for (var grade : userDto.getGrades()) {
                grades.add(gradeConverter.toEntity(grade));
            }
            user.setGrades(grades);
        }

        return user;
    }
}