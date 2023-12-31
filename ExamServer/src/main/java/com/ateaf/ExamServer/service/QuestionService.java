package com.ateaf.ExamServer.service;

import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;

import java.util.List;
import java.util.Map;
import java.util.Set;


public interface QuestionService {

    public Question addQuestion(Question question);
    public Question updateQuestion(Question question);
    public Set<Question> getQuestions();
    public Question getQuestion(Long questionId);
    public void deleteQuestion(Long questionId);
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
    public Set<Question> getQuestionsOfQuizAdmin(Quiz quiz);
    
    public Map<String,Object> evalQuiz(String username, List<Question> questionList);
}
