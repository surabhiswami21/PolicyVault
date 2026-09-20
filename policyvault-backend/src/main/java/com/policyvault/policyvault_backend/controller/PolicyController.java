package com.policyvault.policyvault_backend.controller;

import com.policyvault.policyvault_backend.dto.DashboardResponse;
import com.policyvault.policyvault_backend.entity.Policy;
import com.policyvault.policyvault_backend.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class PolicyController {

    private final PolicyService service;

    public PolicyController(PolicyService service) {
        this.service = service;
    }

    // Add Policy
    @PostMapping
    public String addPolicy(@RequestBody Policy policy) {
        return service.addPolicy(policy);
    }

    // Get All Policies
    @GetMapping
    public List<Policy> getAllPolicies() {
        return service.getAllPolicies();
    }

    // Dashboard Data
    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return service.getDashboardData();
    }

    // Get Policy By ID
    @GetMapping("/{id}")
    public Policy getPolicy(@PathVariable Long id) {
        return service.getPolicyById(id);
    }

    // Update Policy
    @PutMapping("/{id}")
    public String updatePolicy(
            @PathVariable Long id,
            @RequestBody Policy policy
    ) {
        return service.updatePolicy(id, policy);
    }

    // Delete Policy
    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        return service.deletePolicy(id);
    }
}