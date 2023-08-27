package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.Exception.UserNameAlreadyExistsException;
import com.ateaf.ExamServer.Exception.UserNotFoundException;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.UserRole;
import com.ateaf.ExamServer.repository.RoleRepository;
import com.ateaf.ExamServer.repository.UserRepository;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //crating a user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws UserNameAlreadyExistsException {

        User local = this.userRepository.findByUsername(user.getUsername());
        if (local!=null) {
            throw new UserNameAlreadyExistsException(user.getUsername() + " already Exist!!");
        }else {
            // user create
            for (UserRole role: userRoles){
                roleRepository.save(role.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }
        return local;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.findById(userId).orElseThrow(() ->( new UserNotFoundException("User with given id is not found")));

        userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(String username, User user, Set<UserRole> userRoles) {

        User local = this.userRepository.findByUsername(username);
        if (local==null) {
            System.out.println("User is not present!!");
        }else {

            for (UserRole role: userRoles){
                roleRepository.save(role.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }
        return local;
    }
}
