package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
