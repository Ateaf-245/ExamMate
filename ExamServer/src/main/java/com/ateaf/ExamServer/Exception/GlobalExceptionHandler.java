package com.ateaf.ExamServer.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<Map<String,Object>> exceptionHandler(UserNotFoundException ex){
//
//        Map map = new HashMap<>();
//        map.put("message",ex.getMessage());
//        map.put("success",false);
//        map.put("status", HttpStatus.NOT_FOUND);
//
//        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
//    }

    // User Not found Exception Handler
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> handlerResourceNotFoundException(UserNotFoundException ex){

        String message = ex.getMessage();
        ApiResponse response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }


    // User Name Used Exception Handler
    @ExceptionHandler(UserNameAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> handlerUserNameAlreadyExistsException(UserNameAlreadyExistsException ex){

        String message = ex.getMessage();
        ApiResponse response = ApiResponse.builder().message(message).success(true).status(HttpStatus.FOUND).build();
        return new ResponseEntity<>(response, HttpStatus.FOUND);
    }

    // Bad Credentials Exception Handler
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> handlerBadCredentialsException(BadCredentialsException ex){

        String message = ex.getMessage();
        ApiResponse response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Other Exception Handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(Exception ex){

        String message = ex.getMessage();
        ApiResponse response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

}
