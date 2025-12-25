package com.quickservice.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String email, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("QuickService – OTP Verification");
        msg.setText(
                "Your One-Time Password (OTP) is: " + otp +
                        "\n\nThis OTP is valid for 5 minutes."
        );

        mailSender.send(msg);
    }
}
