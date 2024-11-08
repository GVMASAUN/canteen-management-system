package com.codeinsight.exercise.service.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.codeinsight.exercise.DTO.FoodItemDTO;
import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.repository.FoodItemRepository;
import com.codeinsight.exercise.service.FoodItemService;

import jakarta.transaction.Transactional;

@Service
public class FoodItemServiceImpl implements FoodItemService {

	@Autowired
	private FoodItemRepository foodItemRepository;

	@Override
	@Transactional
	public GenericResponseDTO<FoodItem> createFoodItem(FoodItemDTO foodItemDTO) {
		GenericResponseDTO<FoodItem> responseDTO = new GenericResponseDTO<FoodItem>();
		try {
			FoodItem foodItem = new FoodItem();
			foodItem.setItemName(foodItemDTO.getItemName());
			foodItem.setItemPrice(foodItemDTO.getItemPrice());

			foodItemRepository.save(foodItem);

			responseDTO.setMessage("Item Added Successfully");
			responseDTO.setStatusCode(HttpStatus.CREATED.value());
		} catch (Exception exception) {
			responseDTO.setError("Error creating food item: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	@Override
	@Transactional
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
	@Transactional
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
	@Transactional
	public GenericResponseDTO<FoodItemDTO> getFoodItem(long itemId) {
		GenericResponseDTO<FoodItemDTO> responseDTO = new GenericResponseDTO<FoodItemDTO>();
		
		try {
			FoodItem foodItem = foodItemRepository.getReferenceById(itemId);
			FoodItemDTO foodItemDTO = new FoodItemDTO();
			foodItemDTO.setItemId(foodItem.getItemId());
			foodItemDTO.setItemName(foodItem.getItemName());
			foodItemDTO.setItemPrice(foodItem.getItemPrice());

			responseDTO.setData(foodItemDTO);
			
			responseDTO.setMessage("Item Fetched Successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setError("Error fetching food item: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		
		return responseDTO;
	}
}
