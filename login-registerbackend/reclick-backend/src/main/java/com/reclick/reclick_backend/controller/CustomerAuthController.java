package com.reclick.reclick_backend.controller;

import com.reclick.reclick_backend.dto.*;
import com.reclick.reclick_backend.service.CustomerAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers/auth")
public class CustomerAuthController {

    private final CustomerAuthService auth;

    public CustomerAuthController(CustomerAuthService auth) { this.auth = auth; }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody CustomerRegisterRequest req) {
        return ResponseEntity.ok(auth.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody CustomerLoginRequest req) {
        return ResponseEntity.ok(auth.login(req));
    }
}
