package com.quickservice.controller;

import com.quickservice.dto.BookingRequest;
import com.quickservice.dto.BookingResponse;
import com.quickservice.model.Booking;
import com.quickservice.model.User;
import com.quickservice.service.BookingService;
import com.quickservice.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final AuthService authService;


    public BookingController(BookingService bookingService, AuthService authService) {
        this.bookingService = bookingService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        }

        try {
            Booking b = bookingService.createBooking(userId, request);
            return ResponseEntity.ok(b);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Internal server error"));
        }
    }

    @GetMapping("/mine")
    public ResponseEntity<?> myBookings(HttpSession session) {
        Long uid = (Long) session.getAttribute("userId");
        if (uid == null) return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        List<Booking> list = bookingService.getBookingsForUser(uid);
        List<BookingResponse> out = list.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id, HttpSession session) {
        Long uid = (Long) session.getAttribute("userId");
        if (uid == null) return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        try {
            Booking b = bookingService.getBooking(id);

            if (!b.getUserId().equals(uid)) {
                return ResponseEntity.status(403).body(Map.of("success", false, "message", "Forbidden"));
            }

            return ResponseEntity.ok(toDTO(b));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", ex.getMessage()));
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, HttpSession session) {
        Long uid = (Long) session.getAttribute("userId");
        if (uid == null) return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        try {
            var b = bookingService.cancelBooking(id, uid);
            return ResponseEntity.ok(toDTO(b));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", ex.getMessage()));
        } catch (SecurityException ex) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", ex.getMessage()));
        }
    }

    @PostMapping("/{id}/feedback")
    public ResponseEntity<?> feedback(@PathVariable Long id,
                                      @RequestBody Map<String, Object> body,
                                      HttpSession session) {

        Long uid = (Long) session.getAttribute("userId");
        if (uid == null)
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));

        try {
            Integer rating = null;
            String review = null;

            if (body.containsKey("rating")) {
                Object r = body.get("rating");
                if (r instanceof Number) rating = ((Number) r).intValue();
                else rating = Integer.parseInt(r.toString());
            }

            if (body.containsKey("review"))
                review = (body.get("review") == null) ? null : body.get("review").toString();

            if (rating == null || rating < 1 || rating > 5) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Rating must be 1–5"));
            }

            Booking updated = bookingService.addFeedback(id, rating, review, uid);
            return ResponseEntity.ok(toDTO(updated));

        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", ex.getMessage()));
        }
    }

    @GetMapping("/completed")
    public ResponseEntity<?> getCompletedBookings(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        }

        List<Booking> completed = bookingService.getCompletedBookings(userId);
        List<BookingResponse> out = completed.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

   private BookingResponse toDTO(Booking b) {
    BookingResponse r = new BookingResponse();
    r.setId(b.getId());
    r.setUserId(b.getUserId());
    r.setProviderId(b.getProviderId());
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
    r.setCustomerEstimatedPrice(b.getCustomerEstimatedPrice());
    r.setProviderEstimatedPrice(b.getProviderEstimatedPrice());
    r.setFinalAmount(b.getFinalAmount());
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

       // Get provider email if provider is assigned
       if (b.getServiceId() != null) {
           try {
               Optional<User> providerOpt = authService.findById(b.getServiceId());
               r.setProviderEmail(providerOpt.map(User::getEmail).orElse(null));
           } catch (Exception e) {
               r.setProviderEmail(null);
           }
       } else {
           r.setProviderEmail(null);
       }

       return r;
}

}
