package ru.lprcup.backend.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tokens")
@Getter
@Setter
public class JwtToken {
    @Column(length = 1024)
    String token;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
}
