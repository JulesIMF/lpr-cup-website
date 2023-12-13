package ru.lprcup.backend.data.repo;

import ru.lprcup.backend.data.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    JwtToken findByToken(String token);
}
