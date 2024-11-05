package com.codeinsight.exercise.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.codeinsight.exercise.DTO.OrderDTO;
import com.codeinsight.exercise.DTO.OrderInformationDTO;
import com.codeinsight.exercise.DTO.OrderItemDTO;
import com.codeinsight.exercise.DTO.ResponseDTO;
import com.codeinsight.exercise.entity.FoodItem;
import com.codeinsight.exercise.entity.FoodOrder;
import com.codeinsight.exercise.entity.OrderDetails;
import com.codeinsight.exercise.entity.User;
import com.codeinsight.exercise.repository.FoodItemRepository;
import com.codeinsight.exercise.repository.FoodOrderRepository;
import com.codeinsight.exercise.repository.UserRepository;

@Service
public class FoodOrderServiceImpl implements FoodOrderService {

	@Autowired
	private FoodItemRepository foodItemRepository;
	@Autowired
	private FoodOrderRepository foodOrderRepository;
	@Autowired
	private UserServiceImpl userService;
	@Autowired
	private UserRepository userRepository;

	@Override
	public ResponseDTO updateOrder(List<OrderItemDTO> orderItemDTO, Long orderId) {
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			Set<OrderDetails> orderDetails = createOrderDetails(orderItemDTO);
			float totalPrice = calculateTotalPrice(orderDetails);

			FoodOrder foodOrder = foodOrderRepository.getReferenceById(orderId);
			foodOrder.setDate(new Date());
			foodOrder.getOrderDetails().clear();
			foodOrder.getOrderDetails().addAll(orderDetails);
			foodOrder.setPrice(totalPrice);

			saveFoodOrder(foodOrder);

			responseDTO.setStatusCode(HttpStatus.OK.value());
			responseDTO.setMessage("Order Updated successfully");
		} catch (Exception exception) {
			responseDTO.setError("Error updating order: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	@Override
	public ResponseDTO storeOrderDetails(List<OrderItemDTO> orderItemDTO) {
		ResponseDTO responseDTO = new ResponseDTO();

		try {
			Set<OrderDetails> orderDetails = createOrderDetails(orderItemDTO);
			float totalPrice = calculateTotalPrice(orderDetails);

			User user = userService.getCurrentUser();
			FoodOrder foodOrder = new FoodOrder();
			foodOrder.setDate(new Date());
			foodOrder.setOrderDetails(orderDetails);
			foodOrder.setPrice(totalPrice);
			foodOrder.setUser(user);

			saveFoodOrder(foodOrder);

			responseDTO.setStatusCode(HttpStatus.OK.value());
			responseDTO.setMessage("Order placed successfully");
		} catch (Exception exception) {
			responseDTO.setError("Error placing order: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	private Set<OrderDetails> createOrderDetails(List<OrderItemDTO> orderItemDTO) {
		Set<OrderDetails> orderDetails = new HashSet<>();
		for (OrderItemDTO orderItem : orderItemDTO) {
			FoodItem foodItem = foodItemRepository.getReferenceById(orderItem.getItemId());
			OrderDetails orderDetail = new OrderDetails();
			orderDetail.setFoodItem(foodItem);
			orderDetail.setQuantity(orderItem.getQuantity());
			orderDetail.setTotalPrice(foodItem.getItemPrice() * orderItem.getQuantity());
			orderDetails.add(orderDetail);
		}
		return orderDetails;
	}

	private float calculateTotalPrice(Set<OrderDetails> orderDetails) {
		return orderDetails.stream().map(OrderDetails::getTotalPrice).reduce(0f, Float::sum);
	}

	private void saveFoodOrder(FoodOrder foodOrder) {
		foodOrderRepository.save(foodOrder);
	}

	private OrderInformationDTO transferToOrderInformationDTO(FoodOrder foodOrder) {
		OrderInformationDTO orderInformationDTO = new OrderInformationDTO();
		orderInformationDTO.setEmail(foodOrder.getUser().getEmail());
		orderInformationDTO.setName(foodOrder.getUser().getName());
		orderInformationDTO.setUserId(foodOrder.getUser().getId());
		orderInformationDTO.setTotalBill(foodOrder.getPrice());
		orderInformationDTO.setOrderDate(foodOrder.getDate());
		orderInformationDTO.setOrderDetails(foodOrder.getOrderDetails());

		return orderInformationDTO;
	}

	@Override
	public OrderInformationDTO getOrderDetails(long orderId) throws Exception {
		FoodOrder foodOrder = foodOrderRepository.getReferenceById(orderId);

		if (foodOrder == null) {
			throw new Exception("No Food Order Exists with this id");
		}

		return transferToOrderInformationDTO(foodOrder);
	}

	@Override
	public ResponseDTO getOrders() {
		ResponseDTO responseDTO = new ResponseDTO();
		List<OrderDTO> ordersDTO = new ArrayList<OrderDTO>();

		try {
			User user = userService.getCurrentUser();
			User fullUser = userRepository.getReferenceById(user.getId());

			fullUser.getFoodOrders().forEach(order -> {
				OrderDTO orderDTO = new OrderDTO(order.getOrderId(), order.getDate());
				orderDTO.setOrderDetails(order.getOrderDetails());
				orderDTO.setTotalPrice(order.getPrice());
				orderDTO.setUserId(fullUser.getId());
				orderDTO.setUserName(fullUser.getName());
				ordersDTO.add(orderDTO);
			});

			responseDTO.setFoodOrders(ordersDTO);

			responseDTO.setStatusCode(HttpStatus.OK.value());
			responseDTO.setMessage("Orders Fetched Successfully");
		} catch (Exception exception) {
			responseDTO.setError("Error fetching orders: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	@Override
	public ResponseDTO getAllOrders() {
		ResponseDTO responseDTO = new ResponseDTO();
		List<OrderDTO> ordersDTO = new ArrayList<OrderDTO>();

		try {
			List<FoodOrder> foodOrders = foodOrderRepository.findAll();

			foodOrders.forEach(foodOrder -> {
				OrderDTO orderDTO = new OrderDTO(foodOrder.getOrderId(), foodOrder.getDate());
				orderDTO.setOrderDetails(foodOrder.getOrderDetails());
				orderDTO.setTotalPrice(foodOrder.getPrice());
				orderDTO.setUserId(foodOrder.getUser().getId());
				orderDTO.setUserName(foodOrder.getUser().getName());
				ordersDTO.add(orderDTO);
			});

			responseDTO.setFoodOrders(ordersDTO);

			responseDTO.setStatusCode(HttpStatus.OK.value());
			responseDTO.setMessage("All orders Fetched Successfully");
		} catch (Exception exception) {
			responseDTO.setError("Error fetching all orders: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}
}
