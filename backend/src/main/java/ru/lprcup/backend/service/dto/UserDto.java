package ru.lprcup.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.lprcup.backend.data.Role;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    private String email;
    private String password;
    private List<RoleDto> roles;
}