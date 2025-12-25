package com.quickservice.service;

import com.quickservice.model.Booking;
import com.quickservice.model.User;
import com.quickservice.repository.BookingRepository;
import com.quickservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProviderService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public ProviderService(BookingRepository bookingRepository,
                           UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // REQUESTS
    // =========================

    // Fetch all bookings matching provider category
    public List<Booking> getProviderRequests(Long providerId) {
        User provider = getProvider(providerId);
        return bookingRepository.findByServiceType(provider.getCategory());
    }

    public Booking acceptRequest(Long bookingId, Long providerId) {
        Booking b = getBooking(bookingId);

        // assign provider on accept
        b.setServiceId(providerId);
        b.setProviderName(getProviderName(providerId));
        b.setStatus("ACCEPTED");

        return bookingRepository.save(b);
    }

    public Booking declineRequest(Long bookingId, Long providerId) {
        Booking b = getOwnedBooking(bookingId, providerId);
        b.setStatus("DECLINED");
        return bookingRepository.save(b);
    }

    public Booking completeRequest(Long bookingId, Long providerId) {
        Booking b = getOwnedBooking(bookingId, providerId);
        b.setStatus("COMPLETED");
        return bookingRepository.save(b);
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
                Integer.parseInt(body.get("experience").toString())
        );

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
            "completedCount", completed.size()
    );
}
public List<Booking> getCompletedServices(Long providerId) {
    return bookingRepository.findByServiceIdAndStatus(providerId, "COMPLETED");
}

}
