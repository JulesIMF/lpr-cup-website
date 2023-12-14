package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
}
