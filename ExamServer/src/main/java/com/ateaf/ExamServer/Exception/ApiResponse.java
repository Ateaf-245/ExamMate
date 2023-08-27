package com.ateaf.ExamServer.Exception;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse {

    private String message;
    private Boolean success;
    private HttpStatus status;

}
