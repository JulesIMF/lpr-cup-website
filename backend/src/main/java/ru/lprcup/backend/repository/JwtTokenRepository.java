package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lprcup.backend.data.JwtToken;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    JwtToken findByToken(String token);
}
