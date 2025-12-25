package com.quickservice.repository;

import com.quickservice.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
}
