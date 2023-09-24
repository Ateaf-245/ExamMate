package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.QuizAggregate;
import com.ateaf.ExamServer.model.exam.QuizResults;
import com.ateaf.ExamServer.service.QuizResultService;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/results")
@CrossOrigin("*")
public class QuizResultController {

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getResultByUser(@PathVariable String username){
        User user = userService.getUser(username);
        return ResponseEntity.ok(quizResultService.getQuizResultByUser(user));
    }

    @GetMapping("/dashboard/{username}")
    public ResponseEntity<Map<String,Object>> getResultForDashboardByUser(@PathVariable String username){
        User user = userService.getUser(username);
        return ResponseEntity.ok(quizResultService.getDashBoardDetailsByUser(user));
    }

    @GetMapping("/admin")
    public ResponseEntity<Set<QuizAggregate>> getAllResult(){
        return ResponseEntity.ok(quizResultService.getQuizResults());
    }
}
