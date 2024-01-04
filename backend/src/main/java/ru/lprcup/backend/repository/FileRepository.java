package ru.lprcup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lprcup.backend.data.File;

public interface FileRepository extends JpaRepository<File, Long> {
}
