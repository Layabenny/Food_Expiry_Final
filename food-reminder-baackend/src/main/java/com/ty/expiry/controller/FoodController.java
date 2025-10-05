package com.ty.expiry.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ty.expiry.model.FoodItem;
import com.ty.expiry.service.FoodService;

@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow React frontend
@RestController
@RequestMapping("/api/foods")

public class FoodController {
	private final FoodService service;

    public FoodController(FoodService service) {
        this.service = service;
    }

    @GetMapping
    public List<FoodItem> getAllFoods() {
        return service.getAllFoods();
    }
    @PostMapping
    public FoodItem addFood(@RequestBody FoodItem food) {
        return service.addFood(food);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        service.deleteFood(id);
    }

}