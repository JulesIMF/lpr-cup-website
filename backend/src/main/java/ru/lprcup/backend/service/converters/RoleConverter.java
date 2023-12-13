package ru.lprcup.backend.service.converters;

import org.springframework.stereotype.Component;

import ru.lprcup.backend.data.Role;
import ru.lprcup.backend.service.dto.RoleDto;

@Component
public class RoleConverter {
    public RoleDto toDto(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        return roleDto;
    }

    public Role toEntity(RoleDto roleDto) {
        Role role = new Role();
        role.setId(roleDto.getId());
        role.setName(roleDto.getName());
        return role;
    }
}
