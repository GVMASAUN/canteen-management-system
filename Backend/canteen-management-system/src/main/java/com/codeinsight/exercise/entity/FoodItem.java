package com.codeinsight.exercise.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FoodItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long itemId;
	@Column(nullable = false)
	private String itemName;
	@Column(nullable = false)
	private float itemPrice;

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long id) {
		this.itemId = id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String item) {
		itemName = item;
	}

	public float getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(float price) {
		this.itemPrice = price;
	}

}
