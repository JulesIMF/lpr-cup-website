package ru.lprcup.backend.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "verdicts")
@Getter
@Setter
public class Verdict {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Submission submission;

    @ManyToOne
    private Task task;

    private String code;
}
