package com.reclick.reclick_backend.repo;

import com.reclick.reclick_backend.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {}
