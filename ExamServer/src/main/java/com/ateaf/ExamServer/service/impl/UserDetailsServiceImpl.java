package com.ateaf.ExamServer.service.impl;

import com.ateaf.ExamServer.Exception.UserNotFoundException;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       User user = this.userRepository.findByUsername(username);
       if (user==null) {
           throw new UserNotFoundException("user not found !!");
       }
        return user;
    }
}
