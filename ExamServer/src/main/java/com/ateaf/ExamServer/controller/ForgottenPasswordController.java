package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.model.ForgottenPassword;
import com.ateaf.ExamServer.service.ForgottenPasswordServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
@CrossOrigin("*")
public class ForgottenPasswordController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private ForgottenPasswordServices forgottenPasswordServices;

    Random random = new Random(10000);

    //    forget password
    @PostMapping("/sendOTP")
    public ResponseEntity<Map<String, String>> getOTP(@RequestBody ForgottenPassword forgottenPassword){
        return new ResponseEntity<>(forgottenPasswordServices.sendOTP(forgottenPassword), HttpStatus.OK);
    }

    @PostMapping("/verifyOTP/{otp}")
    public ResponseEntity<Map<String, String>> VerifyOtp(@PathVariable("otp") Integer otp,@RequestBody ForgottenPassword forgottenPassword){
        System.out.println("otp :"+otp);
        return new ResponseEntity<>(forgottenPasswordServices.verifyOTP(otp,forgottenPassword), HttpStatus.OK);
    }

    @PostMapping("/ChangePassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody ForgottenPassword forgottenPassword){

        // Only update the password if it's provided in the request
        if (forgottenPassword.getPassword() != null && !forgottenPassword.getPassword().isEmpty()) {
            forgottenPassword.setPassword(this.bCryptPasswordEncoder.encode(forgottenPassword.getPassword()));
        }else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Please enter the new password");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(forgottenPasswordServices.changePassword(forgottenPassword), HttpStatus.OK);
    }
}
