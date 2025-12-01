package com.reclick.reclick_backend.controller;

import com.reclick.reclick_backend.dto.EmployeeLoginRequest;
import com.reclick.reclick_backend.dto.EmployeeRegisterRequest;
import com.reclick.reclick_backend.dto.AuthResponse;
import com.reclick.reclick_backend.service.EmployeeAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees/auth")
public class EmployeeAuthController {

    private final EmployeeAuthService auth;

    public EmployeeAuthController(EmployeeAuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody EmployeeRegisterRequest req) {
        return ResponseEntity.ok(auth.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody EmployeeLoginRequest req) {
        return ResponseEntity.ok(auth.login(req));
    }
}
