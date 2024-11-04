package com.codeinsight.exercise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.codeinsight.exercise.DTO.OrderInformationDTO;
import com.codeinsight.exercise.DTO.OrderItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;
import com.codeinsight.exercise.service.FoodOrderService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class OrderController {

	@Autowired
	private FoodOrderService foodOrderService;

	@PostMapping("/order")
	public ResponseEntity<ResponseDTO> placeOrder(@RequestBody List<OrderItemDTO> orderItemDTO) {
		return ResponseEntity.ok(foodOrderService.storeOrderDetails(orderItemDTO));
	}

	@GetMapping("/order/{id}")
	public OrderInformationDTO putMethodName(@PathVariable String id) throws Exception{
		OrderInformationDTO orderInforamtionDTO = null;
		try {
			orderInforamtionDTO = foodOrderService.getOrderDetails(Long.parseLong(id));
		} catch (Exception exception) {
			return null;
		}
		return orderInforamtionDTO;
	}
	
	@GetMapping("/user/order")
	public ResponseEntity<ResponseDTO> getCurrentUserOrder() {
		return ResponseEntity.ok(foodOrderService.getOrders());
	}
	
	@GetMapping("/user/orders")
	public ResponseEntity<ResponseDTO> getAllOrders() {
		return ResponseEntity.ok(foodOrderService.getAllOrders());
	}
	
	@PutMapping("order/{id}")
	public ResponseEntity<ResponseDTO> updateUserOrder(@PathVariable String id, @RequestBody List<OrderItemDTO> orderItemDTO) {
		return ResponseEntity.ok(foodOrderService.updateOrder(orderItemDTO,Long.parseLong(id)));
	}
}
