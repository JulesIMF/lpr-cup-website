package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Role;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.service.dto.RoleDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class UserConverter {
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setSurname(user.getSurname());
        userDto.setName(user.getName());
        userDto.setPatronymic(user.getPatronymic());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());

        ArrayList<RoleDto> roles = new ArrayList<RoleDto>();
        for (Role role : user.getRoles()) {
            RoleDto newRole = new RoleDto();
            newRole.setId(role.getId());
            newRole.setName(role.getName());

            roles.add(newRole);
        }

        userDto.setRoles(roles.stream().toList());

        return userDto;
    }

    public User toEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setSurname(userDto.getSurname());
        user.setName(userDto.getName());
        user.setPatronymic(userDto.getPatronymic());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        ArrayList<Role> roles = new ArrayList<Role>();
        for (RoleDto role : userDto.getRoles()) {
            Role newRole = new Role();
            newRole.setId(role.getId());
            newRole.setName(role.getName());

            roles.add(newRole);
        }
        
        user.setRoles(roles.stream().toList());

        return user;
    }
}