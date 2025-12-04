package com.quickserve.repository;

import com.quickserve.entity.ProviderDetails;
import com.quickserve.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProviderDetailsRepository extends JpaRepository<ProviderDetails, Long> {
    Optional<ProviderDetails> findByProvider(User provider);
}
