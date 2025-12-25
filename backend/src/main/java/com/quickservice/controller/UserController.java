package com.quickservice.controller;

import com.quickservice.model.User;
import com.quickservice.service.UserService;
import com.quickservice.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {

        Long uid = (Long) session.getAttribute("userId");
        if (uid == null) {
            return ResponseEntity.status(401).body(
                    Map.of("success", false, "message", "Unauthorized")
            );
        }

        Optional<User> uOpt = userService.findById(uid);

        if (uOpt.isEmpty()) {
            return ResponseEntity.status(404).body(
                    Map.of("success", false, "message", "User not found")
            );
        }

        User user = uOpt.get();

        return ResponseEntity.ok(
        Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRole(),
                "phone", user.getPhone()  // ADDED
        )
);

    }

    @PutMapping("/me")
public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body, HttpSession session) {

    Long uid = (Long) session.getAttribute("userId");
    if (uid == null) {
        return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
    }

    String fullName = body.get("fullName");
    String phone = body.get("phone");

    try {
        User updated = userService.updateProfile(uid, fullName, phone);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Profile updated",
                        "fullName", updated.getFullName(),
                        "phone", updated.getPhone()
                )
        );

    } catch (IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", ex.getMessage())
        );
    }
}


    // NEW: Get all providers
    @GetMapping("/providers")
    public List<User> getProviders() {
        return userRepository.findByRoleIgnoreCase("PROVIDER");
    }
}
