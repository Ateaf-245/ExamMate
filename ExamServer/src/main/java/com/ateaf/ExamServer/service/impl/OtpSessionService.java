package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.OtpSession;
import com.ateaf.ExamServer.repository.OtpSessionRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpSessionService {

    @Autowired
    private OtpSessionRepository otpSessionRepository;

    public void storeOtp(OtpSession otpSession) {
        otpSessionRepository.save(otpSession);
    }

    public OtpSession retrieveOtp(String username) {
        return otpSessionRepository.findByUsername(username);
    }

    public void clearOtp(String username) {
        OtpSession otpSession = otpSessionRepository.findByUsername(username);
        otpSessionRepository.deleteById(otpSession.getSessionID());
    }



//    public void storeOtp(HttpSession session,String username, Integer otp) {
//        session.setAttribute(username, otp);
//    }
//
//    public Integer retrieveOtp(HttpSession session,String username) {
//        return (Integer) session.getAttribute(username);
//    }
//
//    public void clearOtp(HttpSession session,String username) {
//        session.removeAttribute(username);
//    }
}
