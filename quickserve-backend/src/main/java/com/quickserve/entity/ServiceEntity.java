package com.quickserve.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Instant createdAt = Instant.now();

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User provider;

    public ServiceEntity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public User getProvider() { return provider; }
    public void setProvider(User provider) { this.provider = provider; }
}
