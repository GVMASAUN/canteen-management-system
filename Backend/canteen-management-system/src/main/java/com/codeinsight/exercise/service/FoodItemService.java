package com.codeinsight.exercise.service;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;

public interface FoodItemService {
	ResponseDTO createFoodItem(FoodItemDTO foodItemDTO);

	ResponseDTO updateItem(FoodItemDTO foodItemDTO);

	ResponseDTO getAllFoodItems();

	ResponseDTO deleteItem(Long id);
}
