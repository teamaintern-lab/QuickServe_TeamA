package com.quickservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(
        name = "otp_temp",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        }
)
public class OtpTemp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 10)
    private String otp;

    @Column(nullable = false)
    private Instant expiry;

    @Column(nullable = false)
    private Boolean verified = false; // ✅ DEFAULT VALUE

    /* ================= GETTERS ================= */

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getOtp() {
        return otp;
    }

    public Instant getExpiry() {
        return expiry;
    }

    public Boolean getVerified() {
        return verified;
    }

    /* ================= SETTERS ================= */

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim().toLowerCase(); // ✅ normalize
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setExpiry(Instant expiry) {
        this.expiry = expiry;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified != null ? verified : false;
    }
}
