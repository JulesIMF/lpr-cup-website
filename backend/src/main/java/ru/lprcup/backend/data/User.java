package ru.lprcup.backend.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    @Column(unique = true)
    private String email;
    private String password;
    @Column(name = "is_admin")
    private Boolean isAdmin;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @ManyToMany
    private Set<Grade> grades;
}
