package com.ateaf.ExamServer.model;

import lombok.Data;

@Data
public class ForgottenPassword {

    String username;
    String email;
    String password;

}
