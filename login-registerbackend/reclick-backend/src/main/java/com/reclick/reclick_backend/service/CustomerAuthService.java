    package com.reclick.reclick_backend.service;

    import com.reclick.reclick_backend.dto.*;
    import com.reclick.reclick_backend.model.Customer;
    import com.reclick.reclick_backend.repo.CustomerRepository;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.stereotype.Service;

    @Service
    public class CustomerAuthService {

        private final CustomerRepository customerRepo;
        private final BCryptPasswordEncoder encoder;

        public CustomerAuthService(CustomerRepository customerRepo, BCryptPasswordEncoder encoder) {
            this.customerRepo = customerRepo;
            this.encoder = encoder;
        }

        public AuthResponse register(CustomerRegisterRequest req) {
            if (customerRepo.existsByEmail(req.email)) {
                return new AuthResponse("Email already registered");
            }
            Customer c = new Customer();
            c.setName(req.name);
            c.setEmail(req.email);
            c.setPasswordHash(encoder.encode(req.password));
            c.setContactNo(req.contactNo);
            customerRepo.save(c);
            return new AuthResponse("Registered");
        }

        public AuthResponse login(CustomerLoginRequest req) {
            return customerRepo.findByEmail(req.email)
                    .map(c -> {
                        if (encoder.matches(req.password, c.getPasswordHash())) {
                            return new AuthResponse("Login successful", null);
                        } else {
                            return new AuthResponse("Invalid credentials");
                        }
                    })
                    .orElse(new AuthResponse("User not found"));
        }
    }
