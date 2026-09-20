package com.policyvault.policyvault_backend.repository;

import com.policyvault.policyvault_backend.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}