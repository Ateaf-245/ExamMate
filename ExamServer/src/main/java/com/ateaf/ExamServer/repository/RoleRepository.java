package com.ateaf.ExamServer.repository;

import com.ateaf.ExamServer.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
