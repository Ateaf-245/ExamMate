package com.ateaf.ExamServer.service;


import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.UserRole;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface UserService {
    //Creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get a user by username
    public User getUser(String username);

    //get all user
    public List<User> getAllUser();

    //delete a user by ID
    public void deleteUser(Long userId);

    //update a user
    public User updateUser(User user);

}
