package com.quickservice.controller;

import com.quickservice.model.ServiceItem;
import com.quickservice.repository.ServiceItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Public endpoints for service catalog
 */
@RestController
@RequestMapping("/api")
public class ServiceController {

    private final ServiceItemRepository repo;

    public ServiceController(ServiceItemRepository repo) { this.repo = repo; }

    @GetMapping("/services")
    public List<ServiceItem> list() {
        return repo.findAll();
    }
}
