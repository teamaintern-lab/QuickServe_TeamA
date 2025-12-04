package com.quickserve.repository;

import com.quickserve.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByProviderId(Long providerId);
    List<Booking> findByCustomerId(Long customerId);
}
