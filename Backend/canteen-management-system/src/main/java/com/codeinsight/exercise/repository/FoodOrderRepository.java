package com.codeinsight.exercise.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeinsight.exercise.entity.FoodOrder;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long>{

}
