package com.codeinsight.exercise.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class FoodOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	@Column(nullable = false)
	private Date orderDate;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "order_id")
	private Set<OrderDetails> orderDetails = new HashSet<OrderDetails>();
	@Column(nullable = false)
	private float totalPrice;

	public Long getOrderId() {
		return orderId;
	}

	
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return orderDate;
	}

	public void setDate(Date date) {
		this.orderDate = date;
	}

	public Set<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(Set<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public float getPrice() {
		return totalPrice;
	}

	public void setPrice(float price) {
		this.totalPrice = price;
	}

}
