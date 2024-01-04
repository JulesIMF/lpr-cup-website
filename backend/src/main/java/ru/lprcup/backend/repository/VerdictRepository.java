package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lprcup.backend.data.Verdict;

public interface VerdictRepository extends JpaRepository<Verdict, Long> {
}
