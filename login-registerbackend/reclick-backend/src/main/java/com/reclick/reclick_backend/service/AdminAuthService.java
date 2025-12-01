package com.reclick.reclick_backend.service;

import com.reclick.reclick_backend.dto.AdminLoginRequest;
import com.reclick.reclick_backend.dto.AdminRegisterRequest;
import com.reclick.reclick_backend.dto.AuthResponse;
import com.reclick.reclick_backend.model.Admin;
import com.reclick.reclick_backend.repo.AdminRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminAuthService(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(AdminRegisterRequest request) {
        if (adminRepository.findByEmail(request.email).isPresent()) {
            return new AuthResponse("Admin already exists with this email!");
        }

        Admin admin = new Admin();
        admin.setName(request.name);
        admin.setEmail(request.email);
        admin.setPasswordHash(passwordEncoder.encode(request.password));

        adminRepository.save(admin);
        return new AuthResponse("Admin registered successfully!");
    }

    public AuthResponse login(AdminLoginRequest request) {
        return adminRepository.findByEmail(request.email)
                .map(admin -> {
                    if (passwordEncoder.matches(request.password, admin.getPasswordHash())) {
                        return new AuthResponse("Admin logged in successfully", null);
                    } else {
                        return new AuthResponse("Invalid password!");
                    }
                })
                .orElse(new AuthResponse("Admin not found!"));
    }
}
