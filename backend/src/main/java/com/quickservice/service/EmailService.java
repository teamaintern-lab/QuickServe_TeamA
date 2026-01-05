package com.quickservice.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
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

    @Async
    public void sendBookingNotification(String providerEmail, String customerName, String serviceType, String bookingDetails, boolean isNewBooking) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(providerEmail);
        msg.setSubject(isNewBooking ? "QuickService – New Booking Request" : "QuickService – Booking Cancelled");

        String message = isNewBooking ?
                "Dear Service Provider,\n\n" +
                "You have received a new booking request!\n\n" +
                "Customer: " + customerName + "\n" +
                "Service: " + serviceType + "\n" +
                "Details: " + bookingDetails + "\n\n" +
                "Please check your dashboard to accept or decline this request.\n\n" +
                "Best regards,\n" +
                "QuickService Team" :

                "Dear Service Provider,\n\n" +
                "A booking has been cancelled by the customer.\n\n" +
                "Customer: " + customerName + "\n" +
                "Service: " + serviceType + "\n" +
                "Details: " + bookingDetails + "\n\n" +
                "Best regards,\n" +
                "QuickService Team";

        msg.setText(message);
        mailSender.send(msg);
    }

    @Async
    public void sendProviderResponseNotification(String customerEmail, String providerName, String serviceType, String bookingDetails, boolean isAccepted) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(customerEmail);
        msg.setSubject(isAccepted ? "QuickService – Booking Accepted" : "QuickService – Booking Declined");

        String message = isAccepted ?
                "Dear Customer,\n\n" +
                "Great news! Your booking request has been accepted.\n\n" +
                "Service Provider: " + providerName + "\n" +
                "Service: " + serviceType + "\n" +
                "Details: " + bookingDetails + "\n\n" +
                "The service provider will contact you soon. You can also chat with them through the app.\n\n" +
                "Best regards,\n" +
                "QuickService Team" :

                "Dear Customer,\n\n" +
                "We regret to inform you that your booking request has been declined.\n\n" +
                "Service: " + serviceType + "\n" +
                "Details: " + bookingDetails + "\n\n" +
                "Please try booking with another available service provider.\n\n" +
                "Best regards,\n" +
                "QuickService Team";

        msg.setText(message);
        mailSender.send(msg);
    }

    @Async
    public void sendCompletionNotification(String customerEmail, String providerName, String serviceType, String bookingDetails) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(customerEmail);
        msg.setSubject("QuickService – Service Completed");

        String message = "Dear Customer,\n\n" +
                "Your service has been completed successfully!\n\n" +
                "Service Provider: " + providerName + "\n" +
                "Service: " + serviceType + "\n" +
                "Details: " + bookingDetails + "\n\n" +
                "Please rate your experience and leave feedback in the app.\n\n" +
                "Best regards,\n" +
                "QuickService Team";

        msg.setText(message);
        mailSender.send(msg);
    }
}
