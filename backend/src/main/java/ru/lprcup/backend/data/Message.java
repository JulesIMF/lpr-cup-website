package ru.lprcup.backend.data;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "messages")
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

    @Column(length = 1024)
    private String text;

    @OneToOne
    @JoinColumn(nullable = true)
    private File file;
}
