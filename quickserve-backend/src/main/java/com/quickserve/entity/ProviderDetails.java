package com.quickserve.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "provider_details")
public class ProviderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "provider_id", unique = true, nullable = false)
    private User provider;

    private String serviceCategory;
    private String customService;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getProvider() { return provider; }
    public void setProvider(User provider) { this.provider = provider; }

    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }

    public String getCustomService() { return customService; }
    public void setCustomService(String customService) { this.customService = customService; }
}
