package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.OtpSession;
import com.ateaf.ExamServer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpSessionRepository extends JpaRepository<OtpSession, Long> {

    public OtpSession findByUsername(String username);
}
