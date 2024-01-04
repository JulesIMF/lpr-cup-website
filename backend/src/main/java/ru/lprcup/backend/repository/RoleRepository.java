package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lprcup.backend.data.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
