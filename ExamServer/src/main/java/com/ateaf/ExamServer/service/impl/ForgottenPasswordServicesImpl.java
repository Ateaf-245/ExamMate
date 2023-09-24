package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.Exception.UserNotFoundException;
import com.ateaf.ExamServer.model.ForgottenPassword;
import com.ateaf.ExamServer.model.OtpSession;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.repository.UserRepository;
import com.ateaf.ExamServer.service.ForgottenPasswordServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
public class ForgottenPasswordServicesImpl implements ForgottenPasswordServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpSessionService otpSessionService;

    Random random = new Random(10000);

    @Override
    public  Map<String, String> sendOTP(ForgottenPassword forgottenPassword) {

        Map<String, String> response = new HashMap<>();

        User user = userRepository.findByUsername(forgottenPassword.getUsername());
        if (Objects.equals(user.getEmail(), forgottenPassword.getEmail())){

            //Sent OTP
            int otp = random.nextInt(999999);

            //storing the OTP in the DB for user to verify later
            OtpSession otpSession = new OtpSession();
            otpSession.setOtp(otp);
            otpSession.setUsername(user.getUsername());
            otpSessionService.storeOtp(otpSession);

            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(user.getEmail());
                message.setSubject("Your OTP Verification");
                message.setText("Your OTP is: " + otp);
                mailSender.send(message);

            }catch (Exception e){
                e.printStackTrace();
            }
            response.put("message", "Email sent successfully");
            return response;

        }else {
            throw new UserNotFoundException("User with provided Username and Email id does not exist.");
        }
    }

    @Override
    public Map<String, String> verifyOTP(Integer otp,ForgottenPassword forgottenPassword) {
        Map<String, String> response = new HashMap<>();

        String username = forgottenPassword.getUsername();
        Integer storedOtp = otpSessionService.retrieveOtp(username).getOtp();

        //checks if the user provided otp matches with the originally generated otp.
        // if yes, allow user to reset the password and clear the otp from the db
        if (storedOtp.equals(otp)){
            response.put("message", "OTP is Verified successfully");
            otpSessionService.clearOtp(username);
        }else {
            response.put("message", "Incorrect OTP");
        }
        return response;

    }

    @Override
    public Map<String, String> changePassword(ForgottenPassword forgottenPassword) {
        Map<String, String> response = new HashMap<>();

        try {

            User user = userRepository.findByUsername(forgottenPassword.getUsername());
            user.setPassword(forgottenPassword.getPassword());
            userRepository.save(user);
            response.put("message","Password changed successfully");

        }catch(Exception e){
            response.put("message","Unable to change the password due to server error");
            e.printStackTrace();
        }

        return response;
    }
}
