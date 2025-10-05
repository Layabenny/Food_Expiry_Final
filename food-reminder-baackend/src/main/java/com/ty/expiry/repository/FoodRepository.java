package com.ty.expiry.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ty.expiry.model.FoodItem;

public interface FoodRepository extends JpaRepository<FoodItem, Long>{
}
