package com.ateaf.ExamServer.service;

import com.ateaf.ExamServer.model.ForgottenPassword;
import jakarta.servlet.http.HttpSession;

import java.util.Map;

public interface ForgottenPasswordServices {

    Map<String, String> sendOTP(ForgottenPassword forgottenPassword);

    Map<String, String> verifyOTP(Integer otp, ForgottenPassword forgottenPassword);

    Map<String, String> changePassword(ForgottenPassword forgottenPassword);
}
