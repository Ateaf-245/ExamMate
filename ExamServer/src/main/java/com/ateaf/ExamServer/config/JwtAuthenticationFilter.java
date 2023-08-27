package com.ateaf.ExamServer.config;

import com.ateaf.ExamServer.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       final String requestTokenHeader = request.getHeader("Authorization");
        System.out.println(requestTokenHeader);
        String username=null;
        String jwtToken=null;

        if (requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")){

            try {
                //remove Bearer from the header
                jwtToken=requestTokenHeader.substring(7);
                System.out.println(jwtToken);
                // extract the username from token
               username = this.jwtUtil.extractUsername(jwtToken);

            }catch (ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("jwt token has expired");
            }catch (Exception e){
                e.printStackTrace();
                System.out.println("error");
            }

        }else{
            System.out.println("Invalid token, not start with bearer String");
        }

        //Validation
        if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            final UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("stage 1");

            if(this.jwtUtil.validateToken(jwtToken,userDetails)){
                //token is valid
                System.out.println("stage 2");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }else {
            System.out.println("Token is not valid");
        }
        System.out.println("stage 3");
        filterChain.doFilter(request,response);
    }
}
