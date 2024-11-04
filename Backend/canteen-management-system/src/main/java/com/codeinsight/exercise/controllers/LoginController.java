package com.codeinsight.exercise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;
import com.codeinsight.exercise.DTO.UserDTO;
import com.codeinsight.exercise.service.FoodItemService;
import com.codeinsight.exercise.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class LoginController{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FoodItemService foodItemService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<ResponseDTO> login(@RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.login(userDTO, authenticationManager));
	}
	
	@PostMapping("/register")
	public ResponseEntity<ResponseDTO> registerUser(@RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.registerUser(userDTO, passwordEncoder));
	}
	
	@GetMapping("/item")
	public ResponseEntity<ResponseDTO> getFoodItems(){
		return ResponseEntity.ok(foodItemService.getAllFoodItems());
	}
	
	@PostMapping("/item")
	public ResponseEntity<ResponseDTO> addFoodItem(@RequestBody FoodItemDTO foodItemDTO) {
		return ResponseEntity.ok(foodItemService.createFoodItem(foodItemDTO));
	}
	
	@PutMapping("/item")
	public ResponseEntity<ResponseDTO> updateFoodItem(@RequestBody FoodItemDTO foodItemDTO) {
		return ResponseEntity.ok(foodItemService.updateItem(foodItemDTO));
	}
	
	@DeleteMapping("/item/{id}")
	public ResponseEntity<ResponseDTO> deleteFoodItem(@PathVariable String id) throws Exception{
		return ResponseEntity.ok(foodItemService.deleteItem(Long.parseLong(id)));
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<UserDTO>> getUsers() {
		return ResponseEntity.ok(userService.getUsers());
	}
	
	@PutMapping("user/{id}")
	public ResponseEntity<ResponseDTO> updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {		
		return ResponseEntity.ok(userService.updateUser(Long.parseLong(id),userDTO,passwordEncoder));
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<ResponseDTO> deleteUser(@PathVariable String id){
		return ResponseEntity.ok(userService.deleteUser(Long.parseLong(id)));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable String id){
		return ResponseEntity.ok(userService.getUserById(Long.parseLong(id)));
	}
	
}
