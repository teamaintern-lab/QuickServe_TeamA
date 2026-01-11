package com.quickservice.controller;

<<<<<<< HEAD
=======

>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
import com.quickservice.model.ServiceItem;
import com.quickservice.repository.UserRepository;
import com.quickservice.repository.ServiceItemRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    private final UserRepository userRepository;
    private final ServiceItemRepository serviceItemRepository;

    public AdminController(
            UserRepository userRepository,
            ServiceItemRepository serviceRepository) {
        this.userRepository = userRepository;
        this.serviceItemRepository = serviceRepository;
    }

    /*
     * ===============================
     * SECURITY CHECK
     * ================================
     */
    private ResponseEntity<?> checkAdmin(HttpSession session, String override) {
        // ALLOW if header override is present (Master Key for development)
        if ("true".equals(override)) {
            return null;
        }

        String role = (String) session.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Admin access only"));
        }
        return null;
    }

    /*
     * ===============================
     * DASHBOARD OVERVIEW
     * ================================
     */
    @GetMapping("/overview")
    public ResponseEntity<?> overview(
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalProviders",
                userRepository.countByRole("PROVIDER"));
        stats.put("totalBookings", 0); // add booking repo later
        stats.put("totalServices", serviceItemRepository.count());

        return ResponseEntity.ok(stats);
    }

    /*
     * ===============================
     * USER MANAGEMENT
     * ================================
     */
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    /*
     * ===============================
     * SERVICE CATALOG
     * ================================
     */
    @GetMapping("/services")
    public ResponseEntity<?> getServices(
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        return ResponseEntity.ok(serviceItemRepository.findAll());
    }

    @PostMapping("/services")
    public ResponseEntity<?> addService(
            @RequestBody ServiceItem service,
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        serviceItemRepository.save(service);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<?> updateService(
            @PathVariable Long id,
            @RequestBody ServiceItem s,
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        s.setId(id);
        serviceItemRepository.save(s);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(
            @PathVariable Long id,
            HttpSession session,
            @RequestHeader(value = "X-Admin-Override", required = false) String override) {
        ResponseEntity<?> auth = checkAdmin(session, override);
        if (auth != null)
            return auth;

        serviceItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
