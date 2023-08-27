package com.ateaf.ExamServer.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {

    private String authority;

    public Authority(String authority){
        this.authority=authority;
    }

    @Override
    public String getAuthority() {
        return  this.authority;
    }
}
