package com.quickserve.service;

import com.quickserve.dto.AuthRequest;
import com.quickserve.dto.AuthResponse;
import com.quickserve.dto.RegisterRequest;
import com.quickserve.entity.ProviderDetails;
import com.quickserve.entity.User;
import com.quickserve.exception.InvalidCredentialsException;
import com.quickserve.exception.ResourceAlreadyExistsException;
import com.quickserve.repository.ProviderDetailsRepository;
import com.quickserve.repository.UserRepository;
import com.quickserve.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ProviderDetailsRepository providerDetailsRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       ProviderDetailsRepository providerDetailsRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.providerDetailsRepository = providerDetailsRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest req) {

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setRole("provider".equalsIgnoreCase(req.getRole()) ? User.Role.PROVIDER : User.Role.CUSTOMER);
        userRepository.save(user);

        // If provider — create provider details
        if (user.getRole() == User.Role.PROVIDER) {
            ProviderDetails pd = new ProviderDetails();
            pd.setProvider(user);
            pd.setServiceCategory(req.getCategory());
            pd.setCustomService(req.getCustomService());
            providerDetailsRepository.save(pd);
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(AuthRequest req) {
        Optional<User> opt = userRepository.findByEmail(req.getEmail());
        if (opt.isEmpty()) throw new InvalidCredentialsException("Invalid credentials");

        User user = opt.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole().name());
    }
}
