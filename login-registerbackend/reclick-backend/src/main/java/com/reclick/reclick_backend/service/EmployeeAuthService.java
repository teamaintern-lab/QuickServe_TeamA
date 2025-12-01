package com.reclick.reclick_backend.service;

import com.reclick.reclick_backend.dto.EmployeeLoginRequest;
import com.reclick.reclick_backend.dto.EmployeeRegisterRequest;
import com.reclick.reclick_backend.dto.AuthResponse;
import com.reclick.reclick_backend.model.Employee;
import com.reclick.reclick_backend.repo.EmployeeRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeAuthService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public EmployeeAuthService(EmployeeRepository employeeRepository, BCryptPasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(EmployeeRegisterRequest request) {
        if (employeeRepository.findByEmail(request.email).isPresent()) {
            return new AuthResponse("Employee already exists with this email!");
        }

        Employee emp = new Employee();
        emp.setName(request.name);
        emp.setEmail(request.email);
        emp.setPasswordHash(passwordEncoder.encode(request.password));
        emp.setPhoneNo(request.phoneNo);
        emp.setAddress(request.address);

        employeeRepository.save(emp);
        return new AuthResponse("Employee registered successfully!");
    }

    public AuthResponse login(EmployeeLoginRequest request) {
        return employeeRepository.findByEmail(request.email)
                .map(emp -> {
                    if (passwordEncoder.matches(request.password, emp.getPasswordHash())) {
                        return new AuthResponse("Employee logged in successfully", null);
                    } else {
                        return new AuthResponse("Invalid password!");
                    }
                })
                .orElse(new AuthResponse("Employee not found!"));
    }
}
