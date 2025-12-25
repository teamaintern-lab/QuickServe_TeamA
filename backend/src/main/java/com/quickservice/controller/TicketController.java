package com.quickservice.controller;

import com.quickservice.model.Ticket;
import com.quickservice.model.User;
import com.quickservice.repository.TicketRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TicketController {

    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // CREATE TICKET
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket, HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("Unauthorized");
        }

        User user = new User();
        user.setId(userId);

        ticket.setUser(user);
        ticket.setStatus("OPEN");

        return ticketRepository.save(ticket);
    }

    // GET MY TICKETS
    @GetMapping("/mine")
    public List<Ticket> getMyTickets(HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("Unauthorized");
        }

        return ticketRepository.findByUserId(userId);
    }
}
