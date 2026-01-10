package com.quickservice.controller;

import com.quickservice.model.ChatMessage;
import com.quickservice.service.ChatService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/bookings/{bookingId}/messages")
    public ResponseEntity<?> sendMessage(@PathVariable Long bookingId,
                                         @RequestBody Map<String, Object> body,
                                         HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        }

        String message = (String) body.get("message");
<<<<<<< HEAD
        Long senderId = ((Number) body.get("senderId")).longValue();

        if (!senderId.equals(userId)) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", "Sender ID mismatch"));
        }
=======
>>>>>>> 7e6c529 (final updated code)

        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Message cannot be empty"));
        }

        try {
<<<<<<< HEAD
            ChatMessage chatMessage = chatService.sendMessage(bookingId, senderId, message.trim());
=======
            ChatMessage chatMessage = chatService.sendMessage(bookingId, userId, message.trim());
>>>>>>> 7e6c529 (final updated code)
            return ResponseEntity.ok(chatMessage);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
        } catch (Exception ex) {
<<<<<<< HEAD
=======
            ex.printStackTrace();
>>>>>>> 7e6c529 (final updated code)
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Internal server error"));
        }
    }

    @GetMapping("/bookings/{bookingId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Long bookingId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Unauthorized"));
        }

        try {
            List<ChatMessage> messages = chatService.getMessagesForBooking(bookingId, userId);
            return ResponseEntity.ok(messages);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Internal server error"));
        }
    }
}