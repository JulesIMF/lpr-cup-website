package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.episode = :episode")
    List<Task> findByEpisode(@Param("episode") Episode episode);
}
