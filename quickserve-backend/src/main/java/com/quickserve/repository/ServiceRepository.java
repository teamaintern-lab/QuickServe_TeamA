package com.quickserve.repository;

import com.quickserve.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByProviderId(Long providerId);
}
