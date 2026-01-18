package com.quickservice.repository;

import com.quickservice.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // CUSTOMER
    Optional<Booking> findTopByUserIdOrderByIdDesc(Long userId);

    List<Booking> findByUserIdOrderByIdDesc(Long userId);

    List<Booking> findByUserIdAndStatus(Long userId, String status);

    // PROVIDER (service_id stores providerId)
    List<Booking> findByServiceId(Long providerId);

    List<Booking> findByServiceIdOrderByIdDesc(Long providerId);

    List<Booking> findByServiceIdAndStatus(Long providerId, String status);

    // OPTIONAL (category-based matching)
    List<Booking> findByServiceType(String serviceType);
<<<<<<< HEAD
=======

>>>>>>> 6fafcb9 (updated project code)
    // REQUESTED bookings by category (not yet assigned)
    List<Booking> findByServiceTypeAndStatus(String serviceType, String status);

}
