package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.model.exam.Category;
import com.ateaf.ExamServer.repository.CategoryRepository;
import com.ateaf.ExamServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).get();
    }

    @Override
    public void deleteCategory(Long categoryId) {

//        Category category = new Category();
//        category.setCid(categoryId);
//        categoryRepository.delete(category);

        categoryRepository.deleteById(categoryId);
    }
}
