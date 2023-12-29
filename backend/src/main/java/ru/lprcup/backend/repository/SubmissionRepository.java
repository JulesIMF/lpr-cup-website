package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("SELECT COUNT(s) FROM Submission s WHERE s.episode = :episode AND s.student = :student")
    Long countByEpisodeAndStudent(@Param("episode") Episode episode, @Param("student") User student);
}
