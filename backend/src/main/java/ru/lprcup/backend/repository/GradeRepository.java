package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    @Query("SELECT g FROM Grade g WHERE g.number = :number AND g.year = (SELECT MAX(g2.year) FROM Grade g2 WHERE g2.number = :number)")
    Grade findByNumberAndMaxYear(@Param("number") Long number);

    @Query("SELECT g FROM Grade g WHERE g.number = :number AND g.season = :season")
    Grade findByNumberAndSeason(@Param("number") Long number, @Param("season") Long season);
}
