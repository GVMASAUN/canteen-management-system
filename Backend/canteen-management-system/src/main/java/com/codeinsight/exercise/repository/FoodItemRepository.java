package com.codeinsight.exercise.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeinsight.exercise.entity.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long>{

}
