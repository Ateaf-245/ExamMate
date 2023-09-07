package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.Exception.UserNotFoundException;
import com.ateaf.ExamServer.model.Role;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.UserRole;
import com.ateaf.ExamServer.model.exam.Category;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // creating a new user
    @PostMapping("/")
    public User CreateUser(@RequestBody User user) throws Exception {

        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        System.out.println(user);
        userRole.setRole(role);


        roles.add(userRole);

        // setting default profile picture
        user.setProfile("default.png");

        //encoding password
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        return userService.createUser(user,roles);
    }

    //get user by username
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    //get all users
    @GetMapping("/")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    //delete user by ID
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }

    // update a user by username
    @PutMapping("/{username}")
    public User updateUser(@PathVariable String username, User user){
        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return userService.updateUser(username,user,roles);
    }


}
