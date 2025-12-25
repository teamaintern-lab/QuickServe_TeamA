package com.quickservice.service;

import com.quickservice.dto.BookingRequest;
import com.quickservice.model.Booking;
import com.quickservice.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create new booking
    public Booking createBooking(Long userId, BookingRequest req) {

    Booking b = new Booking();

    // REQUIRED: assign user ID
    b.setUserId(userId);

    // Optional fields from frontend
    b.setServiceType(req.getServiceType());
    b.setUrgency(req.getUrgency());
    b.setAddress(req.getAddress());
    b.setDescription(req.getDescription());
    b.setPhone(req.getPhone());
    b.setServiceId(req.getProviderId());         // save providerId in service_id column
    b.setProviderName(req.getProviderName());
    b.setBookingDateTime(req.getBookingDateTime());
    b.setAmount(req.getAmount());

    // Defaults
    if (b.getStatus() == null) b.setStatus("REQUESTED");
    if (b.getProviderName() == null) b.setProviderName("Pending Assignment");
b.setProviderName(req.getProviderName());
b.setServiceId(req.getProviderId());  // use existing column

    return bookingRepository.save(b);
}
    // Fetch all bookings belonging to the user
    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserIdOrderByIdDesc(userId);
    }

    // Retrieve single booking
    public Booking getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
    }

    // Cancel booking
    public Booking cancelBooking(Long bookingId, Long userId) {
        Booking b = getBooking(bookingId);

        if (!b.getUserId().equals(userId)) {
            throw new SecurityException("Not allowed");
        }

        b.setStatus("CANCELLED");
        return bookingRepository.save(b);
    }

    // Completed bookings for a user
    public List<Booking> getCompletedBookings(Long userId) {
        return bookingRepository.findByUserIdAndStatus(userId, "COMPLETED");
    }

    // Add or edit feedback
    public Booking addFeedback(Long bookingId, int rating, String review, Long userId) {
        Booking booking = getBooking(bookingId);

        if (!booking.getUserId().equals(userId)) {
            throw new SecurityException("Not allowed");
        }

        booking.setRating(rating);
        booking.setReview(review);

        return bookingRepository.save(booking);
    }
}
