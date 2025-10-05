package com.ty.expiry.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ty.expiry.model.FoodItem;
import com.ty.expiry.repository.FoodRepository;

@Service

public class FoodService {
	private final FoodRepository repo;

    public FoodService(FoodRepository repo) {
        this.repo = repo;
    }

    public List<FoodItem> getAllFoods() {
        return repo.findAll();
    }

    public FoodItem addFood(FoodItem item) {
        return repo.save(item);
    }

    public void deleteFood(Long id) {
        repo.deleteById(id);
    }


}
