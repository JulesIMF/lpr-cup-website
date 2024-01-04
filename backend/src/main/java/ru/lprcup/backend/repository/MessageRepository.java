package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Message;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE m.dialog = :dialog AND m.time > :last")
    List<Message> findNewMessages(@Param("dialog") Dialog dialog, @Param("last") LocalDateTime last);
}
