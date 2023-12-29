package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
