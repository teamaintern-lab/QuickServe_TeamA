package com.quickserve.controller;

import com.quickserve.entity.Booking;
import com.quickserve.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestParam Long customerId,
                                           @RequestParam Long providerId,
                                           @RequestParam Long serviceId,
                                           @RequestBody Booking booking) {
        Booking b = bookingService.createBooking(customerId, providerId, serviceId, booking);
        return ResponseEntity.ok(b);
    }

    @GetMapping("/provider/{id}/requests")
    public ResponseEntity<List<Booking>> getProviderRequests(@PathVariable("id") Long providerId) {
        return ResponseEntity.ok(bookingService.getBookingsForProvider(providerId));
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Long id, @RequestParam String status) {
        Booking.Status s;
        try {
            s = Booking.Status.valueOf(status.toUpperCase());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid status");
        }
        Booking updated = bookingService.updateBookingStatus(id, s);
        return ResponseEntity.ok(updated);
    }
}
