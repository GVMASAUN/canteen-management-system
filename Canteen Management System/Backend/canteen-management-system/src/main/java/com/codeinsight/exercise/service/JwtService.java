package com.codeinsight.exercise.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.JwtException;

@Service
public interface JwtService {

	public String generateToken(UserDetails userDetails);

	public boolean isTokenValid(String token, UserDetails userDetails) throws JwtException;

	public String extractUsername(String token);	
}
