package com.quickservice.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {
    public void sendOtp(String phone, String otp) {
        // Integrate Twilio / Fast2SMS / MSG91 here
        System.out.println("Phone OTP: " + otp);
    }
}
