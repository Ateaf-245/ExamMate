package com.ateaf.ExamServer.Exception;

public class UserNameAlreadyExistsException extends RuntimeException{

    public UserNameAlreadyExistsException(){
        super("UserName is already used by someone else !!");
    }

    public UserNameAlreadyExistsException(String message){
        super(message);
    }
}
