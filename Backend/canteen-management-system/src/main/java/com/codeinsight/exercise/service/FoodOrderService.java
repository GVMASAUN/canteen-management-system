package com.codeinsight.exercise.service;

import java.util.List;

import com.codeinsight.exercise.DTO.OrderInformationDTO;
import com.codeinsight.exercise.DTO.OrderItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;

public interface FoodOrderService {
	ResponseDTO storeOrderDetails(List<OrderItemDTO> orderItemDTO);

	OrderInformationDTO getOrderDetails(long orderId) throws Exception;

	ResponseDTO getOrders();

	ResponseDTO updateOrder(List<OrderItemDTO> orderItemDTO, Long orderId);

	ResponseDTO getAllOrders();
}
