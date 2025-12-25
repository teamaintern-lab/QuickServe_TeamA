package com.quickservice.repository;

import com.quickservice.model.OtpTemp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTempRepository extends JpaRepository<OtpTemp, Long> {

    Optional<OtpTemp> findByEmail(String email);

    Optional<OtpTemp> findByEmailIgnoreCase(String email);
}
