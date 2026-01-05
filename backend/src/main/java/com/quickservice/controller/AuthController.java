package com.quickservice.controller;

import com.quickservice.dto.AuthRequest;
import com.quickservice.dto.AuthResponse;
import com.quickservice.dto.SignupRequest;
import com.quickservice.model.User;
import com.quickservice.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* ===== GENERATE OTP ===== */
    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@RequestBody Map<String, String> req) {
        authService.generateOtp(req.get("email"));
        return ResponseEntity.ok(
                Map.of("success", true, "message", "OTP sent to email")
        );
    }

    /* ===== VERIFY EMAIL OTP ===== */
    @PostMapping("/verify-email-otp")
    public ResponseEntity<?> verifyEmailOtp(@RequestBody Map<String, String> req) {
        try {
            authService.verifyEmailOtp(
                    req.get("email"),
                    req.get("otp")
            );
            return ResponseEntity.ok(
                    Map.of("success", true, "message", "Email verified successfully")
            );
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(
                    Map.of("success", false, "message", ex.getMessage())
            );
        }
    }



    /* ===== SIGNUP ===== */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        authService.signup(req);
        return ResponseEntity.ok(
                Map.of("success", true, "message", "Account created successfully")
        );
    }

    /* ===== LOGIN ===== */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest req,
            HttpSession session
    ) {
        Optional<User> userOpt =
                authService.login(req.getEmail(), req.getPassword());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new AuthResponse(false, "Invalid credentials"));
        }

        User user = userOpt.get();

        // ✅ SAVE LOCATION ONLY FOR PROVIDERS
        if ("PROVIDER".equals(user.getRole())
                && req.getLatitude() != null
                && req.getLongitude() != null) {

            user.setLatitude(req.getLatitude());
            user.setLongitude(req.getLongitude());

            authService.save(user); // persist update
        }

        session.setAttribute("userId", user.getId());
        session.setAttribute("role", user.getRole());

        AuthResponse resp = new AuthResponse(true, "Login successful");
        resp.setUserId(user.getId());
        resp.setFullName(user.getFullName());
        resp.setEmail(user.getEmail());
        resp.setRole(user.getRole());
        resp.setCategory(user.getCategory());
        resp.setCustomService(user.getCustomService());

// ✅ CRITICAL: SEND LOCATION BACK TO FRONTEND
        resp.setLatitude(user.getLatitude());
        resp.setLongitude(user.getLongitude());

        return ResponseEntity.ok(resp);
    }
    /* ===== LOGOUT ===== */
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new AuthResponse(true, "Logged out"));
    }

    /* ===== SESSION ===== */
    @GetMapping("/session")
    public ResponseEntity<?> session(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new AuthResponse(false, "No active session"));
        }

        Optional<User> userOpt = authService.findById(userId);

        if (userOpt.isEmpty()) {
            session.invalidate();
            return ResponseEntity.status(401)
                    .body(new AuthResponse(false, "No active session"));
        }

        User u = userOpt.get();
        AuthResponse resp = new AuthResponse(true, "Active session");
        resp.setUserId(u.getId());
        resp.setFullName(u.getFullName());
        resp.setEmail(u.getEmail());
        resp.setRole(u.getRole());
        resp.setCategory(u.getCategory());
        resp.setCustomService(u.getCustomService());
        resp.setLatitude(u.getLatitude());
        resp.setLongitude(u.getLongitude());
        return ResponseEntity.ok(resp);
    }
    /* ===== RESET PASSWORD ===== */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        try {
            authService.resetPassword(
                    req.get("email"),
                    req.get("newPassword")
            );
            return ResponseEntity.ok(
                    Map.of("success", true, "message", "Password reset successful")
            );
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(
                    Map.of("success", false, "message", ex.getMessage())
            );
        }
    }

}
