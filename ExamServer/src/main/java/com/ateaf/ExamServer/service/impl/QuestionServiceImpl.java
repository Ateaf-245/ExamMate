package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.repository.QuestionRepository;
import com.ateaf.ExamServer.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestions() {
        return new LinkedHashSet<>(questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId).get();
    }

    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {

        System.out.println(quiz);
        Set<Question> questions = questionRepository.findByQuiz(quiz);
        System.out.println(questions);

        List<Question> list = new ArrayList<>(questions);
        System.out.println(list);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        Collections.shuffle(list);
        return new LinkedHashSet<>(list);
    }
}
