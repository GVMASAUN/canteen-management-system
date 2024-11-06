package com.codeinsight.exercise.service;

import java.util.List;

import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.DTO.OrderDTO;
import com.codeinsight.exercise.DTO.OrderItemDTO;

public interface FoodOrderService {
	public GenericResponseDTO<OrderDTO> storeOrderDetails(List<OrderItemDTO> orderItemDTO);

	public GenericResponseDTO<OrderDTO> getOrderDetails(long orderId) throws Exception;

	public GenericResponseDTO<List<OrderDTO>> getCurrentUserOrders();

	public GenericResponseDTO<OrderDTO> updateOrder(List<OrderItemDTO> orderItemDTO, Long orderId);

	public GenericResponseDTO<List<OrderDTO>> getAllOrders();

	public GenericResponseDTO<List<OrderDTO>> getUserOrder(long userId);
}
