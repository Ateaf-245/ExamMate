package com.ateaf.ExamServer.model;


import com.ateaf.ExamServer.model.exam.QuizResults;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long id;
    private String username;
    private String email;
    private  String password;
    private String firstname;
    private String lastname;
    private String profile;
    private String phone;
    private boolean enabled = true;

    //user has many roles
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "user")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();

    //Quiz results
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "user")
    @JsonIgnore
    private Set<QuizResults> quizResults = new HashSet<>();

    // override classes of User details interface for security

}
