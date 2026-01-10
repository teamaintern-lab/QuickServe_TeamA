package com.quickservice.controller;

import com.quickservice.dto.BookingResponse;
import com.quickservice.model.Booking;
import com.quickservice.model.User;
import com.quickservice.service.ProviderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.quickservice.service.AuthService;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    private final ProviderService providerService;
    private final AuthService authService;

    public ProviderController(ProviderService providerService, AuthService authService) {
        this.providerService = providerService;
        this.authService = authService;
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
        List<Booking> bookings = providerService.getProviderRequests(pid);
        List<BookingResponse> responses = bookings.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/requests/{id}/accept")
<<<<<<< HEAD
    public ResponseEntity<?> accept(@PathVariable Long id, HttpSession session) {
        Booking booking = providerService.acceptRequest(id, providerId(session));
=======
    public ResponseEntity<?> accept(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> body, HttpSession session) {
        Double providerEstimatedPrice = body != null && body.get("providerEstimatedPrice") != null
            ? ((Number) body.get("providerEstimatedPrice")).doubleValue()
            : null;
        Booking booking = providerService.acceptRequest(id, providerId(session), providerEstimatedPrice);
>>>>>>> 7e6c529 (final updated code)
        return ResponseEntity.ok(toDTO(booking));
    }

    @PutMapping("/requests/{id}/decline")
    public ResponseEntity<?> decline(@PathVariable Long id, HttpSession session) {
        Booking booking = providerService.declineRequest(id, providerId(session));
        return ResponseEntity.ok(toDTO(booking));
    }

    @PutMapping("/requests/{id}/complete")
<<<<<<< HEAD
    public ResponseEntity<?> complete(@PathVariable Long id, HttpSession session) {
        Booking booking = providerService.completeRequest(id, providerId(session));
=======
    public ResponseEntity<?> complete(@PathVariable Long id, @RequestBody Map<String, Object> body, HttpSession session) {
        Double finalAmount = ((Number) body.get("finalAmount")).doubleValue();
        Booking booking = providerService.completeRequest(id, providerId(session), finalAmount);
>>>>>>> 7e6c529 (final updated code)
        return ResponseEntity.ok(toDTO(booking));
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

   private BookingResponse toDTO(Booking b) {
    BookingResponse r = new BookingResponse();
    r.setId(b.getId());
    r.setUserId(b.getUserId());
    r.setServiceId(b.getServiceId());
    r.setServiceType(b.getServiceType());
    r.setUrgency(b.getUrgency());
    r.setBookingDateTime(b.getBookingDateTime());
    r.setAddress(b.getAddress());
    r.setDescription(b.getDescription());
    r.setPhone(b.getPhone());
    r.setStatus(b.getStatus());
    r.setRating(b.getRating());
    r.setReview(b.getReview());
    r.setProviderName(b.getProviderName());
<<<<<<< HEAD
=======
    r.setCustomerEstimatedPrice(b.getCustomerEstimatedPrice());
    r.setProviderEstimatedPrice(b.getProviderEstimatedPrice());
    r.setFinalAmount(b.getFinalAmount());
>>>>>>> 7e6c529 (final updated code)
    r.setAmount(b.getAmount());
       r.setCustomerLatitude(b.getCustomerLatitude());
       r.setCustomerLongitude(b.getCustomerLongitude());
       r.setProviderLatitude(b.getProviderLatitude());
       r.setProviderLongitude(b.getProviderLongitude());

       // Get customer name
       try {
           Optional<User> customerOpt = authService.findById(b.getUserId());
           r.setCustomerName(customerOpt.map(User::getFullName).orElse("Unknown Customer"));
       } catch (Exception e) {
           r.setCustomerName("Unknown Customer");
       }

       return r;
}

}
