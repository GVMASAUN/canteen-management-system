package com.codeinsight.exercise.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.DTO.UserDTO;

public interface UserService {
	public GenericResponseDTO<UserDTO> registerUser(UserDTO userDTO, PasswordEncoder passwordEncoder);

	public GenericResponseDTO<UserDTO> login(UserDTO userDTO, AuthenticationManager authenticationManager);
	
	public GenericResponseDTO<List<UserDTO>> getUsers();

	public GenericResponseDTO<UserDTO> updateUser(Long userId, UserDTO userDTO, PasswordEncoder passwordEncoder);

	public GenericResponseDTO<UserDTO> deleteUser(Long userId);
	
	public GenericResponseDTO<UserDTO> getUserById(Long userId);
}
