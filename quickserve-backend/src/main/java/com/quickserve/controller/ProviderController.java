package com.quickserve.controller;

import com.quickserve.entity.ProviderDetails;
import com.quickserve.entity.User;
import com.quickserve.repository.ProviderDetailsRepository;
import com.quickserve.repository.UserRepository;
import com.quickserve.dto.ProviderResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    private final UserRepository userRepository;
    private final ProviderDetailsRepository providerDetailsRepository;

    public ProviderController(UserRepository userRepository,
                              ProviderDetailsRepository providerDetailsRepository) {
        this.userRepository = userRepository;
        this.providerDetailsRepository = providerDetailsRepository;
    }

    // Frontend requires this endpoint
    @GetMapping("/email/{email}")
    public ResponseEntity<ProviderResponse> getByEmail(@PathVariable String email) {

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        Optional<ProviderDetails> detailsOpt = providerDetailsRepository.findByProvider(user);

        ProviderResponse resp = new ProviderResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                detailsOpt.orElse(null)
        );

        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ProviderDetails> updateProvider(@PathVariable Long userId,
                                            @RequestBody ProviderDetails body) {

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();

        ProviderDetails details =
                providerDetailsRepository.findByProvider(user).orElse(new ProviderDetails());

        details.setProvider(user);
        details.setServiceCategory(body.getServiceCategory());
        details.setCustomService(body.getCustomService());

        providerDetailsRepository.save(details);

        return ResponseEntity.ok(details);
    }
}
