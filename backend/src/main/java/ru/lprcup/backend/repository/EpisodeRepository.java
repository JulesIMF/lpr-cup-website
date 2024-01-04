package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Grade;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    @Query("SELECT e FROM Episode e WHERE e.number = :number AND e.grade = :grade")
    Episode findByNumberAndGrade(@Param("number") Long number, @Param("grade") Grade grade);

    Episode findFirstByGradeOrderByNumberDesc(Grade grade);
}
