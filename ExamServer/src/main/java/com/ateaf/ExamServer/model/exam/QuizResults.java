package com.ateaf.ExamServer.model.exam;

import com.ateaf.ExamServer.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "quizResult")
public class QuizResults {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long qrID;

    //user
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    //quiz
    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;

    private double bestScore;
    private Long attempts;
    private LocalDateTime lastAttemptedOn;

}
