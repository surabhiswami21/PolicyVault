package com.policyvault.policyvault_backend.service;

import com.policyvault.policyvault_backend.dto.DashboardResponse;
import com.policyvault.policyvault_backend.entity.Policy;
import com.policyvault.policyvault_backend.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    private final PolicyRepository repository;

    public PolicyService(PolicyRepository repository) {
        this.repository = repository;
    }


    // =========================
    // ADD POLICY
    // =========================

    public String addPolicy(Policy policy) {

        repository.save(policy);

        return "Policy Added Successfully";
    }


    // =========================
    // GET ALL POLICIES
    // =========================

    public List<Policy> getAllPolicies() {

        return repository.findAll();
    }


    // =========================
    // GET POLICY BY ID
    // =========================

    public Policy getPolicyById(Long id) {

        return repository
                .findById(id)
                .orElse(null);
    }


    // =========================
    // UPDATE POLICY
    // =========================

    public String updatePolicy(Long id, Policy policy) {

        Optional<Policy> optionalPolicy =
                repository.findById(id);

        if (optionalPolicy.isEmpty()) {

            return "Policy Not Found";
        }

        Policy existing = optionalPolicy.get();

        existing.setPolicyName(
                policy.getPolicyName()
        );

        existing.setCompany(
                policy.getCompany()
        );

        existing.setPolicyNumber(
                policy.getPolicyNumber()
        );

        existing.setPremiumAmount(
                policy.getPremiumAmount()
        );

        existing.setPremiumDate(
                policy.getPremiumDate()
        );

        existing.setMaturityDate(
                policy.getMaturityDate()
        );

        existing.setPolicyType(
                policy.getPolicyType()
        );

        existing.setStatus(
                policy.getStatus()
        );

        repository.save(existing);

        return "Policy Updated Successfully";
    }


    // =========================
    // DELETE POLICY
    // =========================

    public String deletePolicy(Long id) {

        if (!repository.existsById(id)) {

            return "Policy Not Found";
        }

        repository.deleteById(id);

        return "Policy Deleted Successfully";
    }


    // =========================
    // DASHBOARD DATA
    // =========================

    public DashboardResponse getDashboardData() {

        List<Policy> policies =
                repository.findAll();


        // Total Policies
        long totalPolicies =
                policies.size();


        // Premium Due
        long premiumDue =
                policies.stream()
                        .filter(policy ->
                                "Active".equalsIgnoreCase(
                                        policy.getStatus()
                                )
                        )
                        .filter(policy ->
                                policy.getPremiumAmount() != null
                        )
                        .mapToLong(policy ->
                                policy.getPremiumAmount().longValue()
                        )
                        .sum();


        // Total Investment
        double totalInvestment =
                policies.stream()
                        .filter(policy ->
                                policy.getPremiumAmount() != null
                        )
                        .mapToDouble(
                                Policy::getPremiumAmount
                        )
                        .sum();


        // Maturity Soon
        long maturitySoon = 0;

        LocalDate today =
                LocalDate.now();

        LocalDate thirtyDaysLater =
                today.plusDays(30);


        for (Policy policy : policies) {

            String maturityDate =
                    policy.getMaturityDate();

            if (maturityDate == null ||
                    maturityDate.isEmpty()) {

                continue;
            }

            try {

                LocalDate date =
                        LocalDate.parse(maturityDate);

                if (!date.isBefore(today)
                        && !date.isAfter(thirtyDaysLater)) {

                    maturitySoon++;
                }

            } catch (Exception e) {

                System.out.println(
                        "Invalid maturity date: "
                                + maturityDate
                );
            }
        }


        // Return Dashboard Response
        return new DashboardResponse(
                totalPolicies,
                premiumDue,
                maturitySoon,
                totalInvestment
        );
    }
}