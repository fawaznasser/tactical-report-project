package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.ItemRepository;
import com.example.demo.model.Item;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repository;

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    public Optional<Item> getItemById(String id) {
        return repository.findById(id);
    }

    public Item createItem(Item item) {
        return repository.save(item);
    }

    public void deleteItem(String id) {
        repository.deleteById(id);
    }
    public Item updateItem(String id, Item updatedItem) {
        return repository.findById(id).map(existingItem -> {
            existingItem.setName(updatedItem.getName());
            existingItem.setDescription(updatedItem.getDescription());
            return repository.save(existingItem);
        }).orElseThrow(() -> new RuntimeException("Item not found"));
    }    
}
