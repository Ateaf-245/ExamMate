package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.model.exam.QuizAggregate;
import com.ateaf.ExamServer.model.exam.QuizResults;
import com.ateaf.ExamServer.repository.QuizResultRepository;
import com.ateaf.ExamServer.service.QuizResultService;
import com.ateaf.ExamServer.service.QuizService;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizResultServiceImpl implements QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private QuizService quizService;

    @Override
    public  Set<QuizAggregate> getQuizResults() {

            try {
                List<QuizResults> quizResults = new ArrayList<>(quizResultRepository.findAll());

                // Create an initial list of QuizAggregate from QuizResults
                List<QuizAggregate> initialQuizAggregateList = quizResults.stream()
                        .map(q -> new QuizAggregate(q.getQuiz(), Math.toIntExact(q.getAttempts()))).toList();

                // Group and sum the totalAttempts for the same quiz
                Map<Quiz, Integer> aggregatedData = initialQuizAggregateList.stream()
                        .collect(Collectors.groupingBy(QuizAggregate::getQuiz,
                                Collectors.summingInt(QuizAggregate::getTotalAttempts)));

                // Convert the map to a set of QuizAggregate
                Set<QuizAggregate> finalQuizAggregateSet = aggregatedData.entrySet().stream()
                        .map(entry -> new QuizAggregate(entry.getKey(), entry.getValue()))
                        .collect(Collectors.toSet());

                return finalQuizAggregateSet;

            } catch (Exception e) {
                e.printStackTrace();
            }
            return Collections.emptySet(); // return an empty set instead of null for better practice
        }

    @Override
    public void dataEvaluation(String username, Quiz quiz, Double score) {
        User user = userService.getUser(username);
        try {
            QuizResults quizResults = quizResultRepository.findQuizResultByUserIdAndQuizQid(user, quiz);
            if (quizResults != null) {
                //below code will be executed when there is an entry with userid and quizId
                quizResults.setAttempts(quizResults.getAttempts() + 1);
                quizResults.setLastAttemptedOn(LocalDateTime.now());
                // get previous best score and store the best score after comparing with the latest score
                double bestScore = quizResults.getBestScore();
                if (bestScore >= score)
                    quizResults.setBestScore(bestScore);
                else
                    quizResults.setBestScore(score);
                updateQuizResult(quizResults);

            } else {
                //below code will be executed when there is no entry with userid and quizId
                // storing the evaluated quiz result;
                quizResults = new QuizResults();

                quizResults.setQuiz(quiz);
                quizResults.setLastAttemptedOn(LocalDateTime.now());
                quizResults.setUser(user);
                quizResults.setAttempts(1L);
                quizResults.setBestScore(score);
                addQuizResult(quizResults);
            }
        } catch (Exception e) {
            e.printStackTrace();  // Log the error or handle it appropriately
        }
    }

    @Override
    public void addQuizResult(QuizResults quizResults) {
        quizResultRepository.save(quizResults);
    }

    @Override
    public void updateQuizResult(QuizResults quizResults) {
        quizResultRepository.save(quizResults);
    }

    @Override
    public Set<QuizResults> getQuizResultByUser(User user) {
        return new LinkedHashSet<>(quizResultRepository.findQuizResultByUserId(user));
    }

    @Override
    public Map<String, Object> getDashBoardDetailsByUser(User user) {
        Map<String, Object> map = new HashMap<>();

        try {
            Set<QuizResults> quizResults = new LinkedHashSet<>(quizResultRepository.findQuizResultByUserId(user));
            Long nMaxAttemptedQuiz = 0L;
            String maxAttemptedQuizName = null;

            for(QuizResults e :quizResults){
                if(nMaxAttemptedQuiz<=e.getAttempts()){
                    nMaxAttemptedQuiz = e.getAttempts();
                    maxAttemptedQuizName = e.getQuiz().getTitle();
                }
            }

            map.put("mostAttemptedQuiz",maxAttemptedQuizName);

            map.put("totalAttempts",quizResultRepository.findSumOfAttemptsByUserId(user));
            map.put("numberOfQuiz",quizResultRepository.findCountOfQuizByUserId(user));
            map.put("averageScore",quizResultRepository.findSumBestScoreByUserId(user)/quizResultRepository.findCountOfQuizByUserId(user));
        }catch (Exception e){
            e.printStackTrace();
        }
        return map;
    }

}
