package com.quickservice.controller;

import com.quickservice.model.Booking;
import com.quickservice.model.User;
import com.quickservice.service.ProviderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    private Long providerId(HttpSession session) {
        return (Long) session.getAttribute("userId");
    }

    // ----------------------------
    // REQUESTS
    // ----------------------------
    @GetMapping("/requests")
    public ResponseEntity<?> requests(HttpSession session) {
        Long pid = providerId(session);
        return ResponseEntity.ok(providerService.getProviderRequests(pid));
    }

    @PutMapping("/requests/{id}/accept")
    public ResponseEntity<?> accept(@PathVariable Long id, HttpSession session) {
        return ResponseEntity.ok(providerService.acceptRequest(id, providerId(session)));
    }

    @PutMapping("/requests/{id}/decline")
    public ResponseEntity<?> decline(@PathVariable Long id, HttpSession session) {
        return ResponseEntity.ok(providerService.declineRequest(id, providerId(session)));
    }

    @PutMapping("/requests/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable Long id, HttpSession session) {
        return ResponseEntity.ok(providerService.completeRequest(id, providerId(session)));
    }
    // ----------------------------
    // PROFILE
    // ----------------------------
    @GetMapping("/profile")
    public ResponseEntity<User> profile(HttpSession session) {
        return ResponseEntity.ok(providerService.getProviderProfile(providerId(session)));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestBody Map<String, Object> body,
            HttpSession session) {
        return ResponseEntity.ok(
                providerService.updateProviderProfile(providerId(session), body)
        );
    }
    @GetMapping("/earnings")
public ResponseEntity<?> earnings(HttpSession session) {
    Long providerId = (Long) session.getAttribute("userId");
    return ResponseEntity.ok(providerService.getEarnings(providerId));
}
@GetMapping("/completed")
public ResponseEntity<?> completed(HttpSession session) {
    Long providerId = (Long) session.getAttribute("userId");
    return ResponseEntity.ok(providerService.getCompletedServices(providerId));
}

}
