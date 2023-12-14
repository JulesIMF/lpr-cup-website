package ru.lprcup.backend.data;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dialogs")
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private User fromUser;

    @ManyToOne
    private Dialog dialog;

    @Column(columnDefinition = "TIMESTAMP", nullable = true)
    private LocalDateTime time;

    private String text;

    @OneToOne
    @JoinColumn(nullable = true)
    private File file;
}
