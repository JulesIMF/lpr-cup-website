package ru.lprcup.backend.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.lprcup.backend.data.Role;
import ru.lprcup.backend.repository.RoleRepository;
import ru.lprcup.backend.service.api.RoleService;
import ru.lprcup.backend.service.converters.RoleConverter;
import ru.lprcup.backend.service.dto.RoleDto;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleConverter roleConverter;

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = roleConverter.toEntity(roleDto);
        Role savedRole = roleRepository.save(role);
        return roleConverter.toDto(savedRole);
    }

    @Override
    public boolean saveRole(RoleDto role) {
        Role roleFromDB = roleRepository.findById(role.getId()).orElse(null);
        if (roleFromDB == null) {
            return false;
        }

        RoleDto newRole = new RoleDto();
        newRole.setId(role.getId());
        newRole.setName(role.getName());

        roleRepository.save(roleConverter.toEntity(newRole));

        return true;
    }

    @Override
    public RoleDto getRoleById(Long roleId) {
        Role role = roleRepository.findById(roleId).orElse(null);
        if (role == null) {
            return null;
        }
        return roleConverter.toDto(role);
    }

    @Override
    public RoleDto getRoleByName(String roleName) {
        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            return null;
        }
        return roleConverter.toDto(role);
    }
}
