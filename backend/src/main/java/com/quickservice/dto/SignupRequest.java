package com.quickservice.dto;

public class SignupRequest {

    private String fullName;
    private String email;
    private String password;
    private String role = "CUSTOMER";

    // Provider fields
    private String category;
    private String customService;
    private Integer experience;
    private String phone;

    public SignupRequest() {}

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role == null ? "CUSTOMER" : role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCustomService() {
        return customService;
    }

    public void setCustomService(String customService) {
        this.customService = customService;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
