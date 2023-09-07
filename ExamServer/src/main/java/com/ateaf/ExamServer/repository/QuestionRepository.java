package com.ateaf.ExamServer.repository;


import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
