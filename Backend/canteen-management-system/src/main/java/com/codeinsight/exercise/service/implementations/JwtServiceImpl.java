package com.codeinsight.exercise.service.implementations;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.codeinsight.exercise.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtServiceImpl implements JwtService {
	private SecretKey key;
	private static final Long EXPIRATION_TIME = 86400000L;
	
	
	private final String secretKey;
	
	public JwtServiceImpl(@Value("${security.jwt.secret-key}") String secretKey) {
		this.secretKey = secretKey;
		System.out.println(secretKey);
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	@Override
	public String generateToken(UserDetails userDetails) {
		return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).signWith(key).compact();
	}

	public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
		return Jwts.builder().claims(claims).subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).signWith(key).compact();
	}

	@Override
	public boolean isTokenValid(String token, UserDetails userDetails) throws JwtException{
		try {
			final String username = extractUsername(token);
			return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
		}catch (ExpiredJwtException exception) {
            throw new JwtException("Token has expired: " + exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            throw new JwtException("Unsupported JWT: " + exception.getMessage());
        } catch (MalformedJwtException exception) {
            throw new JwtException("Malformed JWT: " + exception.getMessage());
        } catch (Exception exception) {
            throw new JwtException("JWT processing error: " + exception.getMessage());
        }
	}

	
	private boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}

	@Override
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
		return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
	}
}
