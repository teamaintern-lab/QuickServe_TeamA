package com.quickserve.dto;

public class ProviderResponse {
    private Long id;
    private String username;
    private String email;
    private Object providerDetails;

    public ProviderResponse(Long id, String username, String email, Object providerDetails) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.providerDetails = providerDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Object getProviderDetails() {
        return providerDetails;
    }

    public void setProviderDetails(Object providerDetails) {
        this.providerDetails = providerDetails;
    }
}
