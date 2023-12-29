package ru.lprcup.backend.data;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "submissions")
@Getter
@Setter
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Episode episode;

    @ManyToOne
    private User student;

    @OneToOne
    private Message message;

    private Long number;

    @OneToMany(mappedBy = "submission")
    private List<Verdict> verdicts;
}
