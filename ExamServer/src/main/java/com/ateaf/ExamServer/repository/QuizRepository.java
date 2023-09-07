package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
}
