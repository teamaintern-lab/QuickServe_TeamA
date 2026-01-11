package com.quickservice.service;

import com.quickservice.model.Booking;
import com.quickservice.model.User;
import com.quickservice.repository.BookingRepository;
import com.quickservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ProviderService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ProviderService(BookingRepository bookingRepository,
<<<<<<< HEAD
                           UserRepository userRepository,
                           EmailService emailService) {
=======
<<<<<<< HEAD
            UserRepository userRepository,
            EmailService emailService) {
=======
                           UserRepository userRepository,
                           EmailService emailService) {
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // =========================
    // REQUESTS
    // =========================

    // Fetch all bookings matching provider category
    public List<Booking> getProviderRequests(Long providerId) {
        User provider = getProvider(providerId);

        // 1️⃣ Unassigned requests (category match)
        List<Booking> requested = bookingRepository
                .findByServiceTypeAndStatus(
                        provider.getCategory(),
<<<<<<< HEAD
=======
<<<<<<< HEAD
                        "REQUESTED");

        // 2️⃣ Assigned to this provider (only ACTIVE ones: REQUESTED, ACCEPTED,
        // COMPLETED)
        List<Booking> assigned = bookingRepository
                .findByServiceId(providerId)
                .stream()
                .filter(b -> !b.getStatus().equals("DECLINED") && !b.getStatus().equals("CANCELLED"))
                .toList();

        // 3️⃣ Use a Set to merge and avoid duplicates (matched by booking ID)
        // LinkedHashSet preserves insertion order
        Set<Booking> uniqueRequests = new LinkedHashSet<>(requested);
        uniqueRequests.addAll(assigned);

        return new ArrayList<>(uniqueRequests);
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
                        "REQUESTED"
                );

        // 2️⃣ Assigned to this provider (ACCEPTED + COMPLETED)
        List<Booking> assigned = bookingRepository
                .findByServiceId(providerId);

        // 3️⃣ Merge both
        requested.addAll(assigned);

        return requested;
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
    }


    public Booking acceptRequest(Long bookingId, Long providerId, Double providerEstimatedPrice) {
        Booking b = getBooking(bookingId);

        // assign provider on accept
        b.setServiceId(providerId);
        b.setProviderName(getProviderName(providerId));
        b.setProviderEstimatedPrice(providerEstimatedPrice);
        b.setStatus("ACCEPTED");

        Booking acceptedBooking = bookingRepository.save(b);

        // Send notification email to customer
        try {
            User customer = userRepository.findById(acceptedBooking.getUserId())
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                    .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + acceptedBooking.getBookingDateTime() +
                    "\nAddress: " + acceptedBooking.getAddress() +
                    "\nDescription: " + acceptedBooking.getDescription() +
                    "\nAmount: ₹" + acceptedBooking.getAmount();

            emailService.sendProviderResponseNotification(
                    customer.getEmail(),
                    provider.getFullName(),
                    acceptedBooking.getServiceType(),
                    bookingDetails,
                    true // isAccepted
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
                .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + acceptedBooking.getBookingDateTime() +
                                  "\nAddress: " + acceptedBooking.getAddress() +
                                  "\nDescription: " + acceptedBooking.getDescription();
            
            if (acceptedBooking.getCustomerEstimatedPrice() != null) {
                bookingDetails += "\nCustomer Estimated Price: ₹" + acceptedBooking.getCustomerEstimatedPrice();
            }
            if (acceptedBooking.getProviderEstimatedPrice() != null) {
                bookingDetails += "\nProvider Estimated Price: ₹" + acceptedBooking.getProviderEstimatedPrice();
            }

            emailService.sendProviderResponseNotification(
                customer.getEmail(),
                provider.getFullName(),
                acceptedBooking.getServiceType(),
                bookingDetails,
                true // isAccepted
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
            );
        } catch (Exception e) {
            // Log the error but don't fail the acceptance
            System.err.println("Failed to send acceptance notification email: " + e.getMessage());
        }

        return acceptedBooking;
    }

    public Booking declineRequest(Long bookingId, Long providerId) {
        Booking b = getOwnedBooking(bookingId, providerId);
        b.setStatus("DECLINED");

        Booking declinedBooking = bookingRepository.save(b);

        // Send notification email to customer
        try {
            User customer = userRepository.findById(declinedBooking.getUserId())
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                    .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + declinedBooking.getBookingDateTime() +
                    "\nAddress: " + declinedBooking.getAddress() +
                    "\nDescription: " + declinedBooking.getDescription() +
                    "\nAmount: ₹" + declinedBooking.getAmount();

            emailService.sendProviderResponseNotification(
                    customer.getEmail(),
                    provider.getFullName(),
                    declinedBooking.getServiceType(),
                    bookingDetails,
                    false // isAccepted = false (declined)
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
                .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + declinedBooking.getBookingDateTime() +
                                  "\nAddress: " + declinedBooking.getAddress() +
                                  "\nDescription: " + declinedBooking.getDescription() +
                                  "\nAmount: ₹" + declinedBooking.getAmount();

            emailService.sendProviderResponseNotification(
                customer.getEmail(),
                provider.getFullName(),
                declinedBooking.getServiceType(),
                bookingDetails,
                false // isAccepted = false (declined)
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
            );
        } catch (Exception e) {
            // Log the error but don't fail the decline
            System.err.println("Failed to send decline notification email: " + e.getMessage());
        }

        return declinedBooking;
    }

    public Booking completeRequest(Long bookingId, Long providerId, Double finalAmount) {
        Booking b = getOwnedBooking(bookingId, providerId);
        b.setFinalAmount(finalAmount);
        b.setStatus("COMPLETED");

        Booking completedBooking = bookingRepository.save(b);

        // Send completion notification email to customer
        try {
            User customer = userRepository.findById(completedBooking.getUserId())
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                    .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + completedBooking.getBookingDateTime() +
                    "\nAddress: " + completedBooking.getAddress() +
                    "\nDescription: " + completedBooking.getDescription() +
                    "\nAmount: ₹" + completedBooking.getAmount();

            emailService.sendCompletionNotification(customer.getEmail(), provider.getFullName(),
                    completedBooking.getServiceType(), bookingDetails);
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
                .orElseThrow(() -> new RuntimeException("Customer not found"));
            User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

            String bookingDetails = "Date: " + completedBooking.getBookingDateTime() +
                                  "\nAddress: " + completedBooking.getAddress() +
                                  "\nDescription: " + completedBooking.getDescription();
            
            if (completedBooking.getCustomerEstimatedPrice() != null) {
                bookingDetails += "\nCustomer Estimated Price: ₹" + completedBooking.getCustomerEstimatedPrice();
            }
            if (completedBooking.getProviderEstimatedPrice() != null) {
                bookingDetails += "\nProvider Estimated Price: ₹" + completedBooking.getProviderEstimatedPrice();
            }
            if (completedBooking.getFinalAmount() != null) {
                bookingDetails += "\nFinal Amount: ₹" + completedBooking.getFinalAmount();
            }

            emailService.sendCompletionNotification(customer.getEmail(), provider.getFullName(), completedBooking.getServiceType(), bookingDetails);
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
        } catch (Exception e) {
            // Log the error but don't fail the completion
            System.err.println("Failed to send completion notification email: " + e.getMessage());
        }

        return completedBooking;
    }

    // =========================
    // EARNINGS
    // =========================

    public double getTotalEarnings(Long providerId) {
        return bookingRepository.findByServiceId(providerId).stream()
                .filter(b -> "COMPLETED".equals(b.getStatus()))
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0)
                .sum();
    }

    // =========================
    // PROFILE
    // =========================

    public User getProviderProfile(Long providerId) {
        return getProvider(providerId);
    }

    public User updateProviderProfile(Long providerId, Map<String, Object> body) {

        User user = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (body.containsKey("fullName"))
            user.setFullName(body.get("fullName").toString());

        if (body.containsKey("category"))
            user.setCategory(body.get("category").toString());

        if (body.containsKey("customService"))
            user.setCustomService(body.get("customService").toString());

        if (body.containsKey("experience"))
            user.setExperience(
                    Integer.parseInt(body.get("experience").toString()));

        if (body.containsKey("phone"))
            user.setPhone(body.get("phone").toString());

        return userRepository.save(user);
    }

    // =========================
    // INTERNAL HELPERS
    // =========================

    private User getProvider(Long providerId) {
        return userRepository.findById(providerId)
                .orElseThrow(() -> new IllegalArgumentException("Provider not found"));
    }

    private Booking getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
    }

    private Booking getOwnedBooking(Long bookingId, Long providerId) {
        Booking b = getBooking(bookingId);
        if (!providerId.equals(b.getServiceId())) {
            throw new SecurityException("Unauthorized provider");
        }
        return b;
    }

    private String getProviderName(Long providerId) {
        return userRepository.findById(providerId)
                .map(User::getFullName)
                .orElse("Unknown Provider");
    }

    public Map<String, Object> getEarnings(Long providerId) {

        List<Booking> completed = bookingRepository
                .findByServiceIdAndStatus(providerId, "COMPLETED");

        List<Booking> accepted = bookingRepository
                .findByServiceIdAndStatus(providerId, "ACCEPTED");

        double total = completed.stream()
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0)
                .sum();

        double pending = accepted.stream()
                .mapToDouble(b -> b.getAmount() != null ? b.getAmount() : 0)
                .sum();

        double avg = completed.isEmpty() ? 0 : total / completed.size();

        return Map.of(
                "total", total,
                "pending", pending,
                "avg", Math.round(avg),
                "completedCount", completed.size());
    }

    public List<Booking> getCompletedServices(Long providerId) {
        return bookingRepository.findByServiceIdAndStatus(providerId, "COMPLETED");
    }

}
