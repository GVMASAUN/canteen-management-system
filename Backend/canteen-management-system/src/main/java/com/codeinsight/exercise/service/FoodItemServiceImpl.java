package com.codeinsight.exercise.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.repository.FoodItemRepository;

@Service
public class FoodItemServiceImpl implements FoodItemService {

	@Autowired
	private FoodItemRepository foodItemRepository;

	@Override
	public ResponseDTO createFoodItem(FoodItemDTO foodItemDTO) {
		ResponseDTO responseDTO = new ResponseDTO();
		try {
			FoodItem foodItem = new FoodItem();
			foodItem.setItemName(foodItemDTO.getItemName());
			foodItem.setItemPrice(foodItemDTO.getItemPrice());
			
			this.saveFoodItem(foodItem);
			
			responseDTO.setMessage("Item Added Successfully");
			responseDTO.setStatusCode(200);
		} catch (Exception exception) {
			responseDTO.setError(exception.getMessage());
			responseDTO.setStatusCode(500);
		}
		return responseDTO;
	}

	private void saveFoodItem(FoodItem foodItem) {
		foodItemRepository.save(foodItem);
	}

	@Override
	public ResponseDTO updateItem(FoodItemDTO foodItemDTO) {
		ResponseDTO responseDTO = new ResponseDTO();
		try {
			FoodItem foodItem = foodItemRepository.getReferenceById(foodItemDTO.getItemId());
			foodItem.setItemName(foodItemDTO.getItemName());
			foodItem.setItemPrice(foodItemDTO.getItemPrice());

			foodItemRepository.save(foodItem);

			responseDTO.setMessage("Item updated Successfully");
			responseDTO.setStatusCode(200);
		} catch (Exception exception) {
			responseDTO.setError(exception.getMessage());
			responseDTO.setStatusCode(500);
		}
		return responseDTO;
	}

	@Override
	public ResponseDTO getAllFoodItems() {
		ResponseDTO responseDTO = new ResponseDTO();
		try {
			List<FoodItem> foodItems = foodItemRepository.findAll();
			responseDTO.setFoodItems(foodItems);
			
			responseDTO.setMessage("Food Items fetched Successfully");
			responseDTO.setStatusCode(200);
		} catch (Exception exception) {
			responseDTO.setStatusCode(500);
			responseDTO.setError(exception.getMessage());
		}
		return responseDTO;
	}

	@Override
	public ResponseDTO deleteItem(Long id) {
		ResponseDTO responseDTO = new ResponseDTO();
		try {
			foodItemRepository.deleteById(id);
			
			responseDTO.setStatusCode(200);
			responseDTO.setMessage("Item deleted Successfully");
		} catch (Exception exception) {
			responseDTO.setStatusCode(500);
			responseDTO.setError(exception.getMessage());
		}
		return responseDTO;
	}
}
