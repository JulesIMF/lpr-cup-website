package ru.lprcup.backend.repository;

import ru.lprcup.backend.data.Dialog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DialogRepository extends JpaRepository<Dialog, Long> {
}
