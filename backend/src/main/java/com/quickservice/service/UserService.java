package com.quickservice.service;

import com.quickservice.model.User;
import com.quickservice.repository.UserRepository;
import com.quickservice.util.GeoUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateProfile(Long id, String fullName, String phone) {

        User u = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!Boolean.TRUE.equals(u.getEmailVerified())) {
            throw new RuntimeException("Account not verified");
        }

        if (fullName != null && !fullName.isBlank()) {
            u.setFullName(fullName);
        }

        if (phone != null && !phone.isBlank()) {
            u.setPhone(phone);
        }

        return userRepository.save(u);
    }

    public List<User> findNearestProviders(
            double customerLat,
            double customerLng,
            double radiusKm
    ) {
        List<User> providers =
                userRepository.findByRoleAndLatitudeIsNotNullAndLongitudeIsNotNull("PROVIDER");

        return providers.stream()
                .map(p -> Map.entry(
                        p,
                        GeoUtils.distanceKm(
                                customerLat,
                                customerLng,
                                p.getLatitude(),
                                p.getLongitude()
                        )
                ))
                .filter(e -> e.getValue() <= radiusKm)
                .sorted(Comparator.comparingDouble(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
