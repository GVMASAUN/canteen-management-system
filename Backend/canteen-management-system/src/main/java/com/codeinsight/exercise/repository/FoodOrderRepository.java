package com.codeinsight.exercise.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codeinsight.exercise.entity.FoodOrder;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long>{
	@Query("SELECT o from FoodOrder o where (:selectedUser = 0 OR o.user.userId = :selectedUser)")
	List<FoodOrder> findAllOrSpecificUserOrders(Long selectedUser);
}
