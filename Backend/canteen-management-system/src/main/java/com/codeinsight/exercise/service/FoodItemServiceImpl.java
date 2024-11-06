package com.codeinsight.exercise.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.repository.FoodItemRepository;

@Service
public class FoodItemServiceImpl implements FoodItemService {

	@Autowired
	private FoodItemRepository foodItemRepository;

	@Override
	public GenericResponseDTO<FoodItem> createFoodItem(FoodItemDTO foodItemDTO) {
		GenericResponseDTO<FoodItem> responseDTO = new GenericResponseDTO<FoodItem>();
		try {
			FoodItem foodItem = new FoodItem();
			foodItem.setItemName(foodItemDTO.getItemName());
			foodItem.setItemPrice(foodItemDTO.getItemPrice());

			this.saveFoodItem(foodItem);

			responseDTO.setMessage("Item Added Successfully");
			responseDTO.setStatusCode(HttpStatus.CREATED.value());
		} catch (Exception exception) {
			responseDTO.setError("Error creating food item: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	private void saveFoodItem(FoodItem foodItem) {
		foodItemRepository.save(foodItem);
	}

	@Override
	public GenericResponseDTO<FoodItem> updateItem(FoodItemDTO foodItemDTO) {
		GenericResponseDTO<FoodItem> responseDTO = new GenericResponseDTO<FoodItem>();
		try {
			FoodItem foodItem = foodItemRepository.getReferenceById(foodItemDTO.getItemId());
			foodItem.setItemName(foodItemDTO.getItemName());
			foodItem.setItemPrice(foodItemDTO.getItemPrice());

			foodItemRepository.save(foodItem);

			responseDTO.setMessage("Item updated Successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setError("Error updating food item: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	@Override
	public GenericResponseDTO<List<FoodItem>> getAllFoodItems() {
		GenericResponseDTO<List<FoodItem>> genericResponse = new GenericResponseDTO<List<FoodItem>>();
		try {
			List<FoodItem> foodItems = foodItemRepository.findAll();
			genericResponse.setData(foodItems);
			genericResponse.setMessage("Food items fetched successfully");
			genericResponse.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			genericResponse.setError("Cannot fetch food items: "+exception.getMessage());
			genericResponse.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return genericResponse;
	}

	@Override
	public GenericResponseDTO<FoodItem> getFoodItem(long itemId) {
		GenericResponseDTO<FoodItem> responseDTO = new GenericResponseDTO<FoodItem>();
		
		try {
			FoodItem foodItem = foodItemRepository.getReferenceById(itemId);

			responseDTO.setData(foodItem);
			
			responseDTO.setMessage("Item Fetched Successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setError("Error fetching food item: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		
		return responseDTO;
	}
}
