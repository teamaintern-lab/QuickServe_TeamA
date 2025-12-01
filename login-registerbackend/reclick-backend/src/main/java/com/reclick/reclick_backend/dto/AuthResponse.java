package com.reclick.reclick_backend.dto;
public class AuthResponse {
    public String message;
    public String token; // optional - left empty if you don't use JWT yet

    public AuthResponse() {}
    public AuthResponse(String message) { this.message = message; }
    public AuthResponse(String message, String token) { this.message = message; this.token = token; }
}
