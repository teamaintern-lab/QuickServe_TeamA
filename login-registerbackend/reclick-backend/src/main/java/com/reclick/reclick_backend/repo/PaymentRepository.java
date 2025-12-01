package com.reclick.reclick_backend.repo;
import com.reclick.reclick_backend.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {}
