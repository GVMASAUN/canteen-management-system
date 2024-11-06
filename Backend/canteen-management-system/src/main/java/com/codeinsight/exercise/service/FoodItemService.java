package com.codeinsight.exercise.service;

import java.util.List;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;

public interface FoodItemService {
	public GenericResponseDTO<FoodItem> createFoodItem(FoodItemDTO foodItemDTO);

	public GenericResponseDTO<FoodItem> updateItem(FoodItemDTO foodItemDTO);

	public GenericResponseDTO<List<FoodItem>> getAllFoodItems();

	public GenericResponseDTO<FoodItem> getFoodItem(long itemId);
}
