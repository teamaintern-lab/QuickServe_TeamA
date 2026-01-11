package com.quickservice.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // REAL PRIMARY KEY

    @Column(name = "user_id", nullable = false)
    private Long userId; // just store the ID, not the user object

    @Column(name = "provider_id", nullable = true)
    private Long providerId;  // provider ID selected by customer

    @Column(name = "provider_id", nullable = true)
    private Long providerId;  // provider ID selected by customer

    @Column(nullable = true)
    private Long serviceId; // you are not using ServiceItem now

    @Column(nullable = true)
    private String serviceType;

    @Column(nullable = true)
    private String urgency;

    @Column(length = 512)
    private String address;

    @Column(length = 512)
    private String description;

    private String phone;

    private String bookingDateTime; // date + time combined

    private String status = "REQUESTED";

    private Integer rating;

    @Column(length = 600)
    private String review;

    private String providerName;

    @Column(name = "customer_estimated_price")
    private Double customerEstimatedPrice;

    @Column(name = "provider_estimated_price")
    private Double providerEstimatedPrice;

    @Column(name = "final_amount")
    private Double finalAmount;

    @Column(nullable = true)
    private Double amount; // Legacy field for backward compatibility

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    // Customer location snapshot
    @Column(name = "customer_latitude")
    private Double customerLatitude;

    @Column(name = "customer_longitude")
    private Double customerLongitude;

    // Provider location snapshot
    @Column(name = "provider_latitude")
    private Double providerLatitude;

    @Column(name = "provider_longitude")
    private Double providerLongitude;
<<<<<<< HEAD


=======
<<<<<<< HEAD
=======


>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

<<<<<<< HEAD
    public Long getUserId() {
        return userId;
    }
=======
    public Long getProviderId() { return providerId; }
    public void setProviderId(Long providerId) { this.providerId = providerId; }

    public Long getProviderId() { return providerId; }
    public void setProviderId(Long providerId) { this.providerId = providerId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
>>>>>>> 7e6c529 (final updated code)

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBookingDateTime() {
        return bookingDateTime;
    }

    public void setBookingDateTime(String bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
    public Double getCustomerEstimatedPrice() { return customerEstimatedPrice; }
    public void setCustomerEstimatedPrice(Double customerEstimatedPrice) { this.customerEstimatedPrice = customerEstimatedPrice; }

    public Double getProviderEstimatedPrice() { return providerEstimatedPrice; }
    public void setProviderEstimatedPrice(Double providerEstimatedPrice) { this.providerEstimatedPrice = providerEstimatedPrice; }

    public Double getFinalAmount() { return finalAmount; }
    public void setFinalAmount(Double finalAmount) { this.finalAmount = finalAmount; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

    public Double getCustomerLatitude() {
        return customerLatitude;
    }

    public void setCustomerLatitude(Double customerLatitude) {
        this.customerLatitude = customerLatitude;
    }

    public Double getCustomerLongitude() {
        return customerLongitude;
    }

    public void setCustomerLongitude(Double customerLongitude) {
        this.customerLongitude = customerLongitude;
    }

    public Double getProviderLatitude() {
        return providerLatitude;
    }

    public void setProviderLatitude(Double providerLatitude) {
        this.providerLatitude = providerLatitude;
    }

    public Double getProviderLongitude() {
        return providerLongitude;
    }

    public void setProviderLongitude(Double providerLongitude) {
        this.providerLongitude = providerLongitude;
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Booking booking = (Booking) o;
        return Objects.equals(id, booking.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
}
