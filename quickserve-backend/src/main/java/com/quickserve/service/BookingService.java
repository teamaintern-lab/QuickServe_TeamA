package com.quickserve.service;

import com.quickserve.entity.Booking;
import com.quickserve.entity.ServiceEntity;
import com.quickserve.entity.User;
import com.quickserve.repository.BookingRepository;
import com.quickserve.repository.ServiceRepository;
import com.quickserve.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          ServiceRepository serviceRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    public Booking createBooking(Long customerId, Long providerId, Long serviceId, Booking booking) {
        Optional<User> customer = userRepository.findById(customerId);
        Optional<User> provider = userRepository.findById(providerId);
        Optional<ServiceEntity> service = serviceRepository.findById(serviceId);

        if (customer.isEmpty() || provider.isEmpty() || service.isEmpty()) {
            throw new RuntimeException("Invalid booking reference IDs");
        }

        booking.setCustomer(customer.get());
        booking.setProvider(provider.get());
        booking.setService(service.get());
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForProvider(Long providerId) {
        return bookingRepository.findByProviderId(providerId);
    }

    public Booking updateBookingStatus(Long bookingId, Booking.Status status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty()) {
            throw new RuntimeException("Booking not found");
        }

        Booking booking = optionalBooking.get();
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}
