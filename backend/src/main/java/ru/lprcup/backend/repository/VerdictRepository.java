package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Verdict;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerdictRepository extends JpaRepository<Verdict, Long> {
}
