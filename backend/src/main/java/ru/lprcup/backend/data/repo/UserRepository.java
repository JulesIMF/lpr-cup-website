package ru.lprcup.backend.data.repo;

import ru.lprcup.backend.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
