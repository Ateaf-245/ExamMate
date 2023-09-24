package com.ateaf.ExamServer.controller;

import com.ateaf.ExamServer.config.JwtUtils;
import com.ateaf.ExamServer.model.JwtRequest;
import com.ateaf.ExamServer.model.JwtResponse;
import com.ateaf.ExamServer.model.User;
import com.ateaf.ExamServer.service.impl.UserDetailsImpl;
import com.ateaf.ExamServer.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    //generate token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
           authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

        }catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("User not found");
        }

        //Authenticate
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));

    }

    private void authenticate(String username, String password) throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));

        }catch (DisabledException e){
            throw new Exception(" USER DISABLED "+ e.getMessage());
        }catch (BadCredentialsException e){
            throw new BadCredentialsException(e.getMessage());
        }
    }

    //returns the details of current user
    @GetMapping("/current-user")
    public Map<String, Object> getCurrentUser(Principal principal){
        UserDetailsImpl userDetails = (UserDetailsImpl) this.userDetailsService.loadUserByUsername(principal.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("user", userDetails.getUser());
        response.put("authorities", userDetails.getAuthorities());

        return response;
    }
}
