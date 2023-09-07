package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.service.QuestionService;
import com.ateaf.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.updateQuestion(question));
    }

    @GetMapping("/")
    public Set<Question> getQuestions(){
        return questionService.getQuestions();
    }

    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId){
        return questionService.getQuestion(questionId);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long quizId){

        Quiz quiz =  quizService.getQuiz(quizId);
        return ResponseEntity.ok(questionService.getQuestionsOfQuiz(quiz));
    }

    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId){
        questionService.deleteQuestion(questionId);
    }

}
