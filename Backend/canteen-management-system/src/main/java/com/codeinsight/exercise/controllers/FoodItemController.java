package com.codeinsight.exercise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.service.FoodItemService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class FoodItemController{
		
	@Autowired
	private FoodItemService foodItemService;
	
	@GetMapping("/item")
	public ResponseEntity<GenericResponseDTO<List<FoodItem>>> getFoodItems() {
		return ResponseEntity.ok(foodItemService.getAllFoodItems());
	}
	
	@GetMapping("/item/{id}")
	public ResponseEntity<GenericResponseDTO<FoodItem>> getFoodItem(@PathVariable String id){
		return ResponseEntity.ok(foodItemService.getFoodItem(Long.parseLong(id)));
	}
	
	@PostMapping("/item")
	public ResponseEntity<GenericResponseDTO<FoodItem>> addFoodItem(@RequestBody FoodItemDTO foodItemDTO) {
		return ResponseEntity.ok(foodItemService.createFoodItem(foodItemDTO));
	}
	
	@PutMapping("/item")
	public ResponseEntity<GenericResponseDTO<FoodItem>> updateFoodItem(@RequestBody FoodItemDTO foodItemDTO) {
		return ResponseEntity.ok(foodItemService.updateItem(foodItemDTO));
	}
}
