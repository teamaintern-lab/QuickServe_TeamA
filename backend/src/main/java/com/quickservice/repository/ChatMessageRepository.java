package com.quickservice.repository;

import com.quickservice.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByBookingIdOrderBySentAtAsc(Long bookingId);

    List<ChatMessage> findByBookingIdAndSenderIdOrReceiverIdOrderBySentAtAsc(Long bookingId, Long senderId, Long receiverId);
}