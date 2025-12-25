package com.quickservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true, length=255)
    private String email;

    @Column(nullable=false)
    private String password;

    @Column(name = "full_name", nullable=false)
    private String fullName;

    @Column(nullable=false)
    private String role = "CUSTOMER";

    // Provider fields
    @Column(nullable = true)
    private String category;

    @Column(nullable = true)
    private String customService;

    @Column(nullable = true)
    private Integer experience;

    @Column(nullable = true)
    private String phone;

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "email_otp")
    private String emailOtp;

    @Column(name = "otp_expiry")
    private Instant otpExpiry;


    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "otp_last_sent_at")
    private Instant otpLastSentAt;

    public User() {}

    public User(String email, String password, String fullName, String role) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCustomService() { return customService; }
    public void setCustomService(String customService) { this.customService = customService; }

    public Integer getExperience() { return experience; }
    public void setExperience(Integer experience) { this.experience = experience; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    // OTP getters & setters

    public String getEmailOtp() {
        return emailOtp;
    }

    public void setEmailOtp(String emailOtp) {
        this.emailOtp = emailOtp;
    }

    public Instant getOtpExpiry() {
        return otpExpiry;
    }

    public void setOtpExpiry(Instant otpExpiry) {
        this.otpExpiry = otpExpiry;
    }

    public Instant getOtpLastSentAt() {
        return otpLastSentAt;
    }

    public void setOtpLastSentAt(Instant otpLastSentAt) {
        this.otpLastSentAt = otpLastSentAt;
    }


}
