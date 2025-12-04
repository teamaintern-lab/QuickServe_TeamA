package com.quickserve.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import org.springframework.beans.factory.InitializingBean;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil implements InitializingBean {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    @Override
    public void afterPropertiesSet() {
        if (jwtSecret == null || jwtSecret.trim().isEmpty()) {
            throw new IllegalStateException("JWT secret is not configured. Set the environment variable JWT_SECRET or provide 'jwt.secret' in application properties.");
        }
        // HS256 requires a key at least 256 bits (32 bytes)
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("Configured JWT secret is too short. Provide a secret with at least 32 bytes (e.g. a 256-bit base64 string).");
        }
    }

    public String generateToken(String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                    .parseClaimsJws(token).getBody().getSubject();
        } catch (JwtException ex) {
            return null;
        }
    }
}
