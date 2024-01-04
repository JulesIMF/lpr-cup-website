package ru.lprcup.backend.data;

import java.util.List;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Episode episode;

    private String name;

    @Column(columnDefinition = "numeric(3,2)")
    private Double weight;
}
