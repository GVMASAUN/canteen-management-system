package com.codeinsight.exercise.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.codeinsight.exercise.DTO.ResponseDTO;
import com.codeinsight.exercise.DTO.UserDTO;

public interface UserService {
	ResponseDTO registerUser(UserDTO userDTO, PasswordEncoder passwordEncoder);

	ResponseDTO login(UserDTO userDTO, AuthenticationManager authenticationManager);
	
	List<UserDTO> getUsers();

	ResponseDTO updateUser(Long userId, UserDTO userDTO, PasswordEncoder passwordEncoder);

	ResponseDTO deleteUser(Long userId);
	
	UserDTO getUserById(Long userId);
}
