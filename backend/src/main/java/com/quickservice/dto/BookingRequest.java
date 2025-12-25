package com.quickservice.dto;

public class BookingRequest {

    private String serviceType;
    private String urgency;
    private String address;
    private String description;

    private String bookingDateTime; // <-- REQUIRED field
    private Long providerId;        // maps to service_id column
    private String providerName;
    private String phone;
    private Double amount;

    public BookingRequest() {}

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBookingDateTime() { return bookingDateTime; }
    public void setBookingDateTime(String bookingDateTime) { this.bookingDateTime = bookingDateTime; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
     public Long getProviderId() { return providerId; }
    public void setProviderId(Long providerId) { this.providerId = providerId; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }
}
