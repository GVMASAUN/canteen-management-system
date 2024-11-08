package com.codeinsight.exercise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.DTO.UserDTO;
import com.codeinsight.exercise.service.UserService;

@RestController
public class UserController {
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<GenericResponseDTO<UserDTO>> login(@RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.login(userDTO, authenticationManager));
	}
	
	@PostMapping("/register")
	public ResponseEntity<GenericResponseDTO<UserDTO>> registerUser(@RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.registerUser(userDTO, passwordEncoder));
	}
	
	@GetMapping("/user")
	public ResponseEntity<GenericResponseDTO<List<UserDTO>>> getUsers() {
		return ResponseEntity.ok(userService.getUsers());
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<GenericResponseDTO<UserDTO>> updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {		
		return ResponseEntity.ok(userService.updateUser(Long.parseLong(id),userDTO,passwordEncoder));
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<GenericResponseDTO<UserDTO>> deleteUser(@PathVariable String id){
		return ResponseEntity.ok(userService.deleteUser(Long.parseLong(id)));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<GenericResponseDTO<UserDTO>> getUserById(@PathVariable String id){
		return ResponseEntity.ok(userService.getUserById(Long.parseLong(id)));
	}
}
