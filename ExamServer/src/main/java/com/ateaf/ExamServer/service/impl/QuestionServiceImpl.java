package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.exam.Question;
import com.ateaf.ExamServer.model.exam.Quiz;
import com.ateaf.ExamServer.repository.QuestionRepository;
import com.ateaf.ExamServer.service.QuestionService;
import com.ateaf.ExamServer.service.QuizResultService;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private UserService userService;

    @Override
    public Question addQuestion(Question question) {
        System.out.println("add question");
        System.out.println(question);
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

        Set<Question> questions = questionRepository.findByQuiz(quiz);

        List<Question> list = new ArrayList<>(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
        list.forEach(question -> {
            question.setAnswer("");
        });
        Collections.shuffle(list);
        return new LinkedHashSet<>(list);
    }

    @Override
    public Set<Question> getQuestionsOfQuizAdmin(Quiz quiz) {

        Set<Question> questions = questionRepository.findByQuiz(quiz);
        List<Question> list = new ArrayList<>(questions);

        Collections.shuffle(list);
        return new LinkedHashSet<>(list);
    }

    @Override
    public Map<String, Object> evalQuiz(String username, List<Question> questionList) {
        double score;
        int correctAnswers = 0;
        int questionsAttempted = 0;
        double marksPerQuestion = Double.parseDouble(questionList.get(0).getQuiz().getMaxMarks())/questionList.size();

        //generating the score
        for (Question q :questionList ){
            Question question = getQuestion(q.getQuestionId());
            if (q.getGivenAnswer() != null && !q.getGivenAnswer().isEmpty()) {
                questionsAttempted++;
            }
            if (question.getAnswer().equals(q.getGivenAnswer())) {
                correctAnswers++;
            }
        }
        score = correctAnswers*marksPerQuestion;

        Long quizId = questionList.get(0).getQuiz().getQid();
        quizResultService.dataEvaluation(username,questionList.get(0).getQuiz(),score);

        return Map.of("marksGot",score,"correctAnswer",correctAnswers,"attempted",questionsAttempted);
    }

}
