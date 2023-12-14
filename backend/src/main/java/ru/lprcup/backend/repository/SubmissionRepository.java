package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
