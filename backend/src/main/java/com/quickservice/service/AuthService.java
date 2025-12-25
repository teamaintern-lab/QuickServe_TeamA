package com.quickservice.service;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.quickservice.dto.SignupRequest;
import com.quickservice.model.OtpTemp;
import com.quickservice.model.User;
import com.quickservice.repository.OtpTempRepository;
import com.quickservice.repository.UserRepository;
import com.quickservice.util.OtpUtil;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final OtpTempRepository otpTempRepository;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       OtpTempRepository otpTempRepository,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.otpTempRepository = otpTempRepository;
        this.emailService = emailService;
    }

    /* ===== GENERATE OTP ===== */
    public void generateOtp(String email) {

        email = email.trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        String otp = OtpUtil.generateOtp();

        OtpTemp record = otpTempRepository
                .findByEmailIgnoreCase(email)
                .orElse(new OtpTemp());

        record.setEmail(email);
        record.setOtp(otp);
        record.setExpiry(Instant.now().plusSeconds(300));
        record.setVerified(false);

        otpTempRepository.save(record);
        emailService.sendOtp(email, otp);
    }

    /* ===== VERIFY OTP ===== */
    public void verifyEmailOtp(String email, String otp) {

        email = email.trim().toLowerCase();

        OtpTemp record = otpTempRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("OTP not generated"));

        if (Boolean.TRUE.equals(record.getVerified())) {
            throw new IllegalArgumentException("Email already verified");
        }

        if (Instant.now().isAfter(record.getExpiry())) {
            throw new IllegalArgumentException("OTP expired");
        }

        if (!record.getOtp().equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        record.setVerified(true);
        otpTempRepository.save(record);
    }


    /* ===== SIGNUP (OTP REQUIRED) ===== */
    public void signup(SignupRequest req) {

        String email = req.getEmail().trim().toLowerCase();

        OtpTemp record = otpTempRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("Email not verified"));

        if (!Boolean.TRUE.equals(record.getVerified())) {
            throw new IllegalArgumentException("Email OTP not verified");
        }

        if (Instant.now().isAfter(record.getExpiry())) {
            otpTempRepository.delete(record);
            throw new IllegalArgumentException("OTP expired. Please regenerate.");
        }

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        String hashed = BCrypt.withDefaults()
                .hashToString(12, req.getPassword().toCharArray());

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(email);
        user.setPassword(hashed);
        user.setRole(req.getRole());
        user.setCategory(req.getCategory());
        user.setCustomService(req.getCustomService());
        user.setExperience(req.getExperience());
        user.setEmailVerified(true);
        user.setPhone(req.getPhone());


        userRepository.save(user);
        otpTempRepository.delete(record); // cleanup
    }

    /* ===== LOGIN ===== */
    public Optional<User> login(String email, String password) {

        email = email.trim().toLowerCase();

        return userRepository.findByEmailIgnoreCase(email)
                .filter(u -> BCrypt.verifyer()
                        .verify(password.toCharArray(), u.getPassword()).verified);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

}
