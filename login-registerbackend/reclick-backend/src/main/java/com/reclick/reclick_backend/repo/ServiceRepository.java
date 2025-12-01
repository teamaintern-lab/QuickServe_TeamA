package com.reclick.reclick_backend.repo;

import com.reclick.reclick_backend.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceItem, Integer> {}
