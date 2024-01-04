package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lprcup.backend.data.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
