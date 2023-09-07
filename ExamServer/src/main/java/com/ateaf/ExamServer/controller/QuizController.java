package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }

    @PutMapping("/")
    public ResponseEntity<?> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }

    @GetMapping("/")
    public Set<Quiz> getQuizzes(){
        return quizService.getQuizzes();
    }

    @GetMapping("/{quizId}")
    public Quiz getQuiz(@PathVariable Long quizId){
        return quizService.getQuiz(quizId);
    }

    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId){
         quizService.deleteQuiz(quizId);
    }



}
