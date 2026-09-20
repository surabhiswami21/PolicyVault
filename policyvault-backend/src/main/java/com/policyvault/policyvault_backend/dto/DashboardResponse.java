package com.policyvault.policyvault_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardResponse {

    private long totalPolicies;

    private long premiumDue;

    private long maturitySoon;

    private double totalInvestment;

}