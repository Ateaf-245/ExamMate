package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.model.exam.QuizAggregate;
import com.ateaf.ExamServer.model.exam.QuizResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResults,Long> {

     //admin end
     @Query("SELECT new com.ateaf.ExamServer.model.exam.QuizAggregate(q.quiz.qid, SUM(q)) FROM QuizResults q GROUP BY q.quiz")
     ArrayList<QuizAggregate> findAllGroupByQuiz();

     //user end
     //to check if there is already and entry with same user and quiz
     @Query("SELECT q FROM QuizResults as q WHERE q.user = :user AND q.quiz= :quiz")
     QuizResults findQuizResultByUserIdAndQuizQid(User user, Quiz quiz);

     //returns the list of results of the quiz that user attempted at least once
     @Query("SELECT q FROM QuizResults as q WHERE q.user = :user")
     List<QuizResults> findQuizResultByUserId(User user);

     // number of time user has taken the quiz (overall)
     @Query("SELECT SUM(q.attempts) FROM QuizResults as q WHERE q.user = :user")
     Long findSumOfAttemptsByUserId(User user);

     //number of quizzes user attempted
     @Query("SELECT COUNT(q.quiz) FROM QuizResults as q WHERE q.user = :user")
     Long findCountOfQuizByUserId(User user);

     //returns the sum of all score which will later on divided by the number of quizzes user attempted
     @Query("SELECT SUM(q.bestScore) FROM QuizResults as q WHERE q.user = :user")
     Long findSumBestScoreByUserId(User user);

}
