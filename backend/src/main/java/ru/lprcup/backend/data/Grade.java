package ru.lprcup.backend.data;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grades")
@Getter
@Setter
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Long number;
    private Long year;
    private Long season;
    @OneToMany(mappedBy = "grade")
    private List<Episode> episodes;
}
