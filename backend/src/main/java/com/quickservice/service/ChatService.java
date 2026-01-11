package com.quickservice.service;

import com.quickservice.model.ChatMessage;
import com.quickservice.model.Booking;
import com.quickservice.repository.ChatMessageRepository;
import com.quickservice.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final BookingRepository bookingRepository;

    public ChatService(ChatMessageRepository chatMessageRepository, BookingRepository bookingRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.bookingRepository = bookingRepository;
    }

    public ChatMessage sendMessage(Long bookingId, Long senderId, String message) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // Determine receiver based on sender
        Long receiverId;
        if (senderId.equals(booking.getUserId())) {
            // Sender is customer, receiver is provider
            receiverId = booking.getServiceId();
            if (receiverId == null) {
                throw new IllegalArgumentException("Cannot send message: No provider assigned to this booking yet");
            }
        } else if (senderId.equals(booking.getServiceId())) {
            // Sender is provider, receiver is customer
            receiverId = booking.getUserId();
        } else {
            throw new IllegalArgumentException("Sender is not part of this booking");
        }

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setBookingId(bookingId);
        chatMessage.setSenderId(senderId);
        chatMessage.setReceiverId(receiverId);
        chatMessage.setMessage(message);

        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessagesForBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        // Check if user is part of the booking
        if (!userId.equals(booking.getUserId()) && !userId.equals(booking.getServiceId())) {
            throw new IllegalArgumentException("User is not part of this booking");
        }

        return chatMessageRepository.findByBookingIdOrderBySentAtAsc(bookingId);
    }
}