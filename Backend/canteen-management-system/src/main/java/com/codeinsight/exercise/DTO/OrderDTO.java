package com.codeinsight.exercise.DTO;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.codeinsight.exercise.entity.OrderDetails;

public class OrderDTO {
	private Long orderId;
	private Date orderDate;
	private Set<OrderDetails> orderDetails = new HashSet<OrderDetails>();
	private Long userId;
	private String userName;
	private float totalPrice;

	public OrderDTO() {
	}

	public OrderDTO(Long orderId, Date orderDate) {
		this.orderId = orderId;
		this.orderDate = orderDate;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Set<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(Set<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
