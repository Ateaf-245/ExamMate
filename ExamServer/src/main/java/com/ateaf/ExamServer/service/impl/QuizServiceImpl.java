package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.exam.Category;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.repository.QuizRepository;
import com.ateaf.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new LinkedHashSet<>(quizRepository.findAll());
    }

    @Override
    public Set<Quiz> getQuizzesByCategory(Category category) {
        return new LinkedHashSet<>(quizRepository.findByCategory(category));
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }

    @Override
    public Set<Quiz> getQuizzesActive() {
        return new LinkedHashSet<>(quizRepository.findByisActive(true));
    }

    @Override
    public Set<Quiz> getQuizzesByCategoryActive(Category category) {
        return new LinkedHashSet<>(quizRepository.findByCategoryAndIsActive(category,true));
    }
}
