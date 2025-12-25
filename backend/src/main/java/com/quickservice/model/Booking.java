package com.quickservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // REAL PRIMARY KEY

    @Column(name = "user_id", nullable = false)
    private Long userId;  // just store the ID, not the user object

    @Column(nullable = true)
    private Long serviceId;   // you are not using ServiceItem now

    @Column(nullable = true)
    private String serviceType;

    @Column(nullable = true)
    private String urgency;

    @Column(length = 512)
    private String address;

    @Column(length = 512)
    private String description;

    private String phone;

    private String bookingDateTime;  // date + time combined

    private String status = "REQUESTED";

    private Integer rating;

    @Column(length = 600)
    private String review;

    private String providerName;

    private Double amount;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();


    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBookingDateTime() { return bookingDateTime; }
    public void setBookingDateTime(String bookingDateTime) { this.bookingDateTime = bookingDateTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
