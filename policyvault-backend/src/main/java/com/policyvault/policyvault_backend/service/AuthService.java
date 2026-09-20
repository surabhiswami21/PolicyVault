package com.policyvault.policyvault_backend.service;

import com.policyvault.policyvault_backend.dto.LoginRequest;
import com.policyvault.policyvault_backend.dto.LoginResponse;
import com.policyvault.policyvault_backend.dto.RefreshTokenRequest;
import com.policyvault.policyvault_backend.entity.RefreshToken;
import com.policyvault.policyvault_backend.entity.User;
import com.policyvault.policyvault_backend.repository.RefreshTokenRepository;
import com.policyvault.policyvault_backend.repository.UserRepository;
import com.policyvault.policyvault_backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository repository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    public AuthService(
            UserRepository repository,
            RefreshTokenRepository refreshTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.repository = repository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    // =========================
    // REGISTER
    // =========================

    public String register(User user) {

        if (repository.findByEmail(user.getEmail()).isPresent()) {

            return "Email Already Exists";
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        repository.save(user);

        return "Registration Successful";
    }


    // =========================
    // LOGIN
    // =========================

    public LoginResponse login(LoginRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            return null;
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            return null;
        }


        // Generate access token
        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );


        // Generate refresh token
        String refreshTokenValue =
                jwtService.generateRefreshToken();


        // Create refresh token entity
        RefreshToken refreshToken =
                new RefreshToken();

        refreshToken.setToken(
                refreshTokenValue
        );

        refreshToken.setEmail(
                user.getEmail()
        );


        // Refresh token valid for 7 days
        refreshToken.setExpiryDate(
                Instant.now().plusSeconds(
                        7 * 24 * 60 * 60
                )
        );


        // Save refresh token
        refreshTokenRepository.save(
                refreshToken
        );


        // Return both tokens
        return new LoginResponse(
                accessToken,
                refreshTokenValue
        );
    }


    // =========================
    // REFRESH ACCESS TOKEN
    // =========================

    public LoginResponse refreshAccessToken(
            RefreshTokenRequest request
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(
                                request.getRefreshToken()
                        )
                        .orElse(null);


        // Token does not exist
        if (refreshToken == null) {

            return null;
        }


        // Token expired
        if (refreshToken
                .getExpiryDate()
                .isBefore(Instant.now())) {

            refreshTokenRepository.delete(
                    refreshToken
            );

            return null;
        }


        // Generate new access token
        String newAccessToken =
                jwtService.generateToken(
                        refreshToken.getEmail()
                );


        // Return new access token
        return new LoginResponse(
                newAccessToken,
                refreshToken.getToken()
        );
    }


    // =========================
    // LOGOUT
    // =========================

    public void logout(String refreshToken) {

        refreshTokenRepository.deleteByToken(
                refreshToken
        );
    }


    // =========================
    // GET PROFILE
    // =========================

    public User getProfile(String email) {

        return repository
                .findByEmail(email)
                .orElse(null);
    }

}