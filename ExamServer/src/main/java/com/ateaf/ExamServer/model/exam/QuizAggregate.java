package com.ateaf.ExamServer.model.exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizAggregate {

    private Quiz quiz;
    private Integer totalAttempts;
}
