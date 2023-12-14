package ru.lprcup.backend.service.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    private String surname;
    private String name;
    private String patronymic;
    private String country;
    private String region;
    private Long currentGrade;
    private List<Long> participationGrades;
    private String telegram;
    private String email;
    private String password;

    public UserDto toUserDto() {
        var user = new UserDto();
        user.setName(name);
        user.setSurname(surname);
        user.setPatronymic(patronymic);
        user.setEmail(email);
        user.setPassword(password);
        user.setIsAdmin(false);
        user.setRoles(new ArrayList<>());
        user.setGrades(new HashSet<>());

        return user;
    }
}
