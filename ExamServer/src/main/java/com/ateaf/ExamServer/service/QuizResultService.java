package com.ateaf.ExamServer.service;

import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.model.exam.QuizAggregate;
import com.ateaf.ExamServer.model.exam.QuizResults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;


public interface QuizResultService {

    //admin
    public   Set<QuizAggregate> getQuizResults();

    //normal
    public void dataEvaluation(String username, Quiz quiz, Double score);
    public void addQuizResult(QuizResults quizResults);
    public void updateQuizResult(QuizResults quizResults);
    public Set<QuizResults> getQuizResultByUser(User user);

    public Map<String,Object> getDashBoardDetailsByUser(User user);

}
