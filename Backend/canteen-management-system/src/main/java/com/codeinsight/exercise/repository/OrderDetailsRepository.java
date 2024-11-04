package com.codeinsight.exercise.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeinsight.exercise.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>{

}
