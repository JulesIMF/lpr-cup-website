package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
