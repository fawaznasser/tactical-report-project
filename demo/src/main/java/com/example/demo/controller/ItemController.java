package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.ItemService;
import com.example.demo.model.Item;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService service;

    @GetMapping
    public List<Item> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable String id) {
        System.out.println("Fetching item with ID: " + id);
    
        return service.getItemById(id)
                      .map(ResponseEntity::ok) // If present, return 200 OK
                      .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)); // If empty, return 404 Not Found
    }
    
    @PostMapping
    public Item createItem(@Valid @RequestBody Item item) {
        return service.createItem(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item updatedItem) {
        return service.updateItem(id, updatedItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        service.deleteItem(id);
    }
}
