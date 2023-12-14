package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
