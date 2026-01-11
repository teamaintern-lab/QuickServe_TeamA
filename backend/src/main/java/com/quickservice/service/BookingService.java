package com.quickservice.service;

import com.quickservice.dto.BookingRequest;
import com.quickservice.model.Booking;
import com.quickservice.repository.BookingRepository;
import org.springframework.stereotype.Service;
import com.quickservice.model.User;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final EmailService emailService;

    public BookingService(BookingRepository bookingRepository, UserService userService, EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.emailService = emailService;
    }


    // Create new booking
    public Booking createBooking(Long userId, BookingRequest req) {
        System.out.println("Creating booking for user: " + userId);
        System.out.println("BookingRequest - serviceType: " + req.getServiceType());
        System.out.println("BookingRequest - bookingDateTime: " + req.getBookingDateTime());
        System.out.println("BookingRequest - providerId: " + req.getProviderId());

        Booking b = new Booking();

        b.setUserId(userId);
        b.setServiceType(req.getServiceType());
        b.setUrgency(req.getUrgency());
        b.setAddress(req.getAddress());
        b.setDescription(req.getDescription());
        b.setPhone(req.getPhone());
        b.setBookingDateTime(req.getBookingDateTime());
        b.setCustomerEstimatedPrice(req.getCustomerEstimatedPrice());

        // ===== LOCATION SNAPSHOT =====
        b.setCustomerLatitude(req.getCustomerLatitude());
        b.setCustomerLongitude(req.getCustomerLongitude());

        // Default state
        b.setStatus("REQUESTED");

        // ===== USE SELECTED PROVIDER =====
        if (req.getProviderId() != null) {
            User provider = userService.findById(req.getProviderId())
                .orElseThrow(() -> new IllegalArgumentException("Selected provider not found"));

            b.setProviderId(req.getProviderId());
            b.setServiceId(req.getProviderId()); // Keep serviceId for backward compatibility
            b.setProviderName(provider.getFullName());
            b.setProviderLatitude(provider.getLatitude());
            b.setProviderLongitude(provider.getLongitude());
        } else {
            // Fallback to distance-based matching if no provider selected
            b.setProviderName("Pending Assignment");

            if (req.getCustomerLatitude() != null && req.getCustomerLongitude() != null) {
                List<User> nearbyProviders =
                        userService.findNearestProviders(
                                req.getCustomerLatitude(),
                                req.getCustomerLongitude(),
                                10.0 // 10 KM radius
                        );

                if (!nearbyProviders.isEmpty()) {
                    User nearest = nearbyProviders.get(0);

                    b.setProviderId(nearest.getId());
                    b.setServiceId(nearest.getId());
                    b.setProviderName(nearest.getFullName());
                    b.setProviderLatitude(nearest.getLatitude());
                    b.setProviderLongitude(nearest.getLongitude());
                }
            }
        }

        Booking savedBooking = bookingRepository.save(b);

        // Send notification email to provider if one was assigned
        if (savedBooking.getServiceId() != null) {
            try {
                User customer = userService.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
                User provider = userService.findById(savedBooking.getServiceId())
                    .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

                String bookingDetails = "Date: " + savedBooking.getBookingDateTime() +
                                      "\nAddress: " + savedBooking.getAddress() +
                                      "\nDescription: " + savedBooking.getDescription() +
                                      "\nEstimated Amount: ₹" + savedBooking.getCustomerEstimatedPrice();

                emailService.sendBookingNotification(
                    provider.getEmail(),
                    customer.getFullName(),
                    savedBooking.getServiceType(),
                    bookingDetails,
                    true // isNewBooking
                );
            } catch (Exception e) {
                // Log the error but don't fail the booking creation
                System.err.println("Failed to send booking notification email: " + e.getMessage());
            }
        }

        return savedBooking;
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
        Booking cancelledBooking = bookingRepository.save(b);

        // Send cancellation notification email to provider if one was assigned
        if (cancelledBooking.getServiceId() != null) {
            try {
                User customer = userService.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
                User provider = userService.findById(cancelledBooking.getServiceId())
                    .orElseThrow(() -> new IllegalArgumentException("Provider not found"));

                String bookingDetails = "Date: " + cancelledBooking.getBookingDateTime() +
                                      "\nAddress: " + cancelledBooking.getAddress() +
                                      "\nDescription: " + cancelledBooking.getDescription() +
                                      "\nEstimated Amount: ₹" + cancelledBooking.getCustomerEstimatedPrice();

                emailService.sendBookingNotification(
                    provider.getEmail(),
                    customer.getFullName(),
                    cancelledBooking.getServiceType(),
                    bookingDetails,
                    false // isNewBooking = false (cancellation)
                );
            } catch (Exception e) {
                // Log the error but don't fail the cancellation
                System.err.println("Failed to send cancellation notification email: " + e.getMessage());
            }
        }

        return cancelledBooking;
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
