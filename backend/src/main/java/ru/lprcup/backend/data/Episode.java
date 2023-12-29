package ru.lprcup.backend.data;

import java.util.List;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "episodes")
@Getter
@Setter
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Grade grade;

    private Long number;

    @OneToMany(mappedBy = "episode")
    private List<Task> tasks;

    @OneToMany(mappedBy = "episode")
    private List<Dialog> dialogs;
}
