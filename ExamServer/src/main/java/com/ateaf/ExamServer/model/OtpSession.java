package com.ateaf.ExamServer.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "otpSession")
public class OtpSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sessionID;
    private String username;
    private Integer otp;
}
