package com.ateaf.ExamServer.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "userRoles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userRoleId;

    // user
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;
}
