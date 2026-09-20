package com.policyvault.policyvault_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "policies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String policyName;

    private String company;

    private String policyNumber;

    private Double premiumAmount;

    private String premiumDate;

    private String maturityDate;

    private String policyType;

    private String status;
}