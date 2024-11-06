package com.codeinsight.exercise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.DTO.OrderDTO;
import com.codeinsight.exercise.DTO.OrderItemDTO;
import com.codeinsight.exercise.service.FoodOrderService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class OrderController {

	@Autowired
	private FoodOrderService foodOrderService;

	@PostMapping("/order")
	public ResponseEntity<GenericResponseDTO<OrderDTO>> placeOrder(@RequestBody List<OrderItemDTO> orderItemDTO) {
		return ResponseEntity.ok(foodOrderService.storeOrderDetails(orderItemDTO));
	}

	@GetMapping("/order/{id}")
	public ResponseEntity<GenericResponseDTO<OrderDTO>> getOrderDetails(@PathVariable String id) throws Exception{
		return ResponseEntity.ok(foodOrderService.getOrderDetails(Long.parseLong(id)));
	}
	
	@GetMapping("/user/order")
	public ResponseEntity<GenericResponseDTO<List<OrderDTO>>> getCurrentUserOrders() {
		return ResponseEntity.ok(foodOrderService.getCurrentUserOrders());
	}
	
	@GetMapping("/user/order/{id}")
	public ResponseEntity<GenericResponseDTO<List<OrderDTO>>> getUserOrder(@PathVariable String id){
		return ResponseEntity.ok(foodOrderService.getUserOrder(Long.parseLong(id)));
	}
	
	@GetMapping("/orders")
	public ResponseEntity<GenericResponseDTO<List<OrderDTO>>> getAllOrders() {
		return ResponseEntity.ok(foodOrderService.getAllOrders());
	}
	
	@PutMapping("order/{id}")
	public ResponseEntity<GenericResponseDTO<OrderDTO>> updateUserOrder(@PathVariable String id, @RequestBody List<OrderItemDTO> orderItemDTO) {
		return ResponseEntity.ok(foodOrderService.updateOrder(orderItemDTO,Long.parseLong(id)));
	}
}
