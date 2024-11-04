package com.codeinsight.exercise.DTO;

import java.util.List;

import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.entity.User;

public class ResponseDTO {
	private int statusCode;
	private String message;
	private String error;
	private List<User> users;
	private String token;
	private String role;
	private List<FoodItem> foodItems;
	private String refreshToken;
	private List<OrderDTO> foodOrders;
	private String expirationTime;

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(String expirationTime) {
		this.expirationTime = expirationTime;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<FoodItem> getFoodItems() {
		return foodItems;
	}

	public void setFoodItems(List<FoodItem> foodItems) {
		this.foodItems = foodItems;
	}

	public List<OrderDTO> getFoodOrders() {
		return foodOrders;
	}

	public void setFoodOrders(List<OrderDTO> foodOrders) {
		this.foodOrders = foodOrders;
	}

}
