package ru.lprcup.backend.service.api;

import ru.lprcup.backend.service.dto.RoleDto;

public interface RoleService {
    RoleDto createRole(RoleDto roleDto);

    boolean saveRole(RoleDto role);

    RoleDto getRoleById(Long roleId);

    RoleDto getRoleByName(String roleName);
}
