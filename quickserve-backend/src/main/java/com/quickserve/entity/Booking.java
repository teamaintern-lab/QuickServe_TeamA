package com.quickserve.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    public enum Status { PENDING, ACCEPTED, REJECTED, COMPLETED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "customer_id")
    private User customer;

    @ManyToOne @JoinColumn(name = "provider_id")
    private User provider;

    @ManyToOne @JoinColumn(name = "service_id")
    private ServiceEntity service;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate bookingDate;
    private String bookingTime;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private Instant createdAt = Instant.now();

    public Booking() {}

    // getters and setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public User getProvider() { return provider; }
    public void setProvider(User provider) { this.provider = provider; }

    public ServiceEntity getService() { return service; }
    public void setService(ServiceEntity service) { this.service = service; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public String getBookingTime() { return bookingTime; }
    public void setBookingTime(String bookingTime) { this.bookingTime = bookingTime; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
