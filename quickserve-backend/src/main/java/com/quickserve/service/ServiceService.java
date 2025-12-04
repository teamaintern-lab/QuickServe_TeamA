package com.quickserve.service;

import com.quickserve.entity.ServiceEntity;
import com.quickserve.entity.User;
import com.quickserve.repository.ServiceRepository;
import com.quickserve.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public ServiceService(ServiceRepository serviceRepository, UserRepository userRepository) {
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
    }

    public ServiceEntity addService(Long providerId, ServiceEntity dto) {
        Optional<User> opt = userRepository.findById(providerId);
        if (opt.isEmpty()) throw new RuntimeException("Provider not found");
        dto.setProvider(opt.get());
        return serviceRepository.save(dto);
    }

    public List<ServiceEntity> getServicesByProvider(Long providerId) {
        return serviceRepository.findByProviderId(providerId);
    }

    public void deleteService(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    public ServiceEntity updateService(Long serviceId, ServiceEntity update) {
        Optional<ServiceEntity> opt = serviceRepository.findById(serviceId);
        if (opt.isEmpty()) throw new RuntimeException("Service not found");
        ServiceEntity existing = opt.get();
        existing.setServiceName(update.getServiceName());
        existing.setDescription(update.getDescription());
        existing.setPrice(update.getPrice());
        return serviceRepository.save(existing);
    }
}
