package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.User;

public interface DialogRepository extends JpaRepository<Dialog, Long> {
    @Query("SELECT d FROM Dialog d WHERE d.student = :student AND d.episode = :episode")
    Dialog findByStudentAndEpisode(@Param("student") User student, @Param("episode") Episode episode);
}
