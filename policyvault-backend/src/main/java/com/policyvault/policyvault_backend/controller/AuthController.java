package com.policyvault.policyvault_backend.controller;

import com.policyvault.policyvault_backend.dto.LoginRequest;
import com.policyvault.policyvault_backend.dto.LoginResponse;
import com.policyvault.policyvault_backend.dto.RefreshTokenRequest;
import com.policyvault.policyvault_backend.entity.User;
import com.policyvault.policyvault_backend.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public String register(
            @RequestBody User user
    ) {

        return service.register(user);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        return service.login(request);
    }


    // =========================
    // REFRESH TOKEN
    // =========================

    @PostMapping("/refresh")
    public LoginResponse refreshToken(
            @RequestBody RefreshTokenRequest request
    ) {

        return service.refreshAccessToken(
                request
        );
    }


    // =========================
    // LOGOUT
    // =========================

    @PostMapping("/logout")
    public String logout(
            @RequestBody RefreshTokenRequest request
    ) {

        service.logout(
                request.getRefreshToken()
        );

        return "Logout Successful";
    }


    // =========================
    // PROFILE
    // =========================

    @GetMapping("/profile/{email}")
    public User getProfile(
            @PathVariable String email
    ) {

        return service.getProfile(email);
    }

}