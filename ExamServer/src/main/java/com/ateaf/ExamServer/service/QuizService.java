package com.ateaf.ExamServer.service;

import com.ateaf.ExamServer.model.exam.Category;
import com.ateaf.ExamServer.model.exam.Quiz;
import java.util.Set;


public interface QuizService {

    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();
    public Set<Quiz> getQuizzesByCategory(Category category);
    public Quiz getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);

    public Set<Quiz> getQuizzesActive();
    public Set<Quiz> getQuizzesByCategoryActive(Category category);
}
