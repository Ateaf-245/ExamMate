package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
