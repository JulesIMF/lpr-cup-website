package ru.lprcup.backend.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dialogs")
@Getter
@Setter
public class Dialog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Episode episode;

    @ManyToOne
    @JoinColumn(nullable = true)
    private User student;

    @Column(columnDefinition = "TIMESTAMP", nullable = true)
    private LocalDateTime lastMessage;

    @Column(columnDefinition = "TIMESTAMP", nullable = true)
    private LocalDateTime lastSubmission;

    @OneToMany(mappedBy = "dialog")
    private List<Message> messages;
}
