package com.reclick.reclick_backend.controller;

import com.reclick.reclick_backend.dto.AdminLoginRequest;
import com.reclick.reclick_backend.dto.AdminRegisterRequest;
import com.reclick.reclick_backend.dto.AuthResponse;
import com.reclick.reclick_backend.service.AdminAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins/auth")
public class AdminAuthController {

    private final AdminAuthService auth;

    public AdminAuthController(AdminAuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AdminRegisterRequest req) {
        return ResponseEntity.ok(auth.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AdminLoginRequest req) {
        return ResponseEntity.ok(auth.login(req));
    }
}
