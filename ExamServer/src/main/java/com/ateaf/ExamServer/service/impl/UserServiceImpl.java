package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.Exception.UserNameAlreadyExistsException;
import com.ateaf.ExamServer.Exception.UserNotFoundException;
import com.ateaf.ExamServer.model.Role;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.model.UserRole;
import com.ateaf.ExamServer.repository.RoleRepository;
import com.ateaf.ExamServer.repository.UserRepository;
import com.ateaf.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public User updateUser( User user){

        User local = this.userRepository.findByUsername(user.getUsername());

       try{
           if (local != null) {

               local.setFirstname(user.getFirstname());
               local.setLastname(user.getLastname());
               local.setEmail(user.getEmail());
               local.setPhone(user.getPhone());



               if (user.getUserRoles() != null) {
                   user.getUserRoles().forEach(userRole -> {
                       if (userRole != null && userRole.getRole() != null) {
                           Role existingRole = null;
                           try {
                               existingRole = roleRepository.findById(userRole.getRole().getRoleId())
                                       .orElseThrow(() -> new Exception("Role not found"));
                           } catch (Exception e) {
                               throw new RuntimeException(e);
                           }

                           userRole.setRole(existingRole); // Associate with existing role
                       }
                   });
               }
               local = this.userRepository.save(local);
           }

       }catch (Exception e){
           e.printStackTrace();
       }
        return local;
    }

}
