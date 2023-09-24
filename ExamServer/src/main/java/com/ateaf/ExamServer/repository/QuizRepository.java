package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.exam.Category;
import com.ateaf.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    Set<Quiz> findByCategory(Category category);

     Set<Quiz> findByisActive(Boolean b);

    Set<Quiz> findByCategoryAndIsActive(Category category,Boolean b);


}
