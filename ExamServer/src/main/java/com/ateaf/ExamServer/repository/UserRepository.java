package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUsername(String username);
}
