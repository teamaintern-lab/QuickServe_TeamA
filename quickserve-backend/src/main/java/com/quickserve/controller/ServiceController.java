package com.quickserve.controller;

import com.quickserve.entity.ServiceEntity;
import com.quickserve.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) { this.serviceService = serviceService; }

    @PostMapping("/provider/{id}/services")
    public ResponseEntity<?> createService(@PathVariable("id") Long providerId, @RequestBody ServiceEntity dto) {
        try {
            ServiceEntity saved = serviceService.addService(providerId, dto);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/provider/{id}/services")
    public ResponseEntity<List<ServiceEntity>> getServices(@PathVariable("id") Long providerId) {
        return ResponseEntity.ok(serviceService.getServicesByProvider(providerId));
    }

    @DeleteMapping("/api/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable("id") Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/services/{id}")
    public ResponseEntity<?> updateService(@PathVariable("id") Long id, @RequestBody ServiceEntity dto) {
        ServiceEntity updated = serviceService.updateService(id, dto);
        return ResponseEntity.ok(updated);
    }
}
