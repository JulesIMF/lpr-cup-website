package ru.lprcup.backend.data.repo;

import ru.lprcup.backend.data.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
