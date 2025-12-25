package com.quickservice.service;

import com.quickservice.model.User;
import com.quickservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateProfile(Long id, String fullName, String phone) {

        User u = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // ✅ OTP verification check
        if (!Boolean.TRUE.equals(u.getEmailVerified())){
            throw new RuntimeException("Account not verified");
        }

        if (fullName != null && !fullName.isBlank()) {
            u.setFullName(fullName);
        }

        if (phone != null && !phone.isBlank()) {
            u.setPhone(phone);
        }

        return userRepository.save(u);
    }
}
