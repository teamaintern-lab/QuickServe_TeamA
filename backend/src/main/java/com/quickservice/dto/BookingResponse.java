package com.quickservice.dto;

public class BookingResponse {

    private Long id;
    private Long userId;
    private Long serviceId;
    private String serviceType;
    private String urgency;
    private String bookingDateTime;
    private String address;
    private String description;
    private String phone;
    private String status;

    private Integer rating;
    private String review;
    private String providerName;
    private String providerEmail;
    private String customerName;
    private Double amount;

    private Double customerLatitude;
    private Double customerLongitude;
    private Double providerLatitude;
    private Double providerLongitude;

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

    public String getBookingDateTime() { return bookingDateTime; }
    public void setBookingDateTime(String bookingDateTime) { this.bookingDateTime = bookingDateTime; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

    public String getProviderEmail() { return providerEmail; }
    public void setProviderEmail(String providerEmail) { this.providerEmail = providerEmail; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

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

}
