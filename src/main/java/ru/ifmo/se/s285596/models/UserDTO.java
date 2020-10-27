package ru.ifmo.se.s285596.models;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDTO {
    @NotEmpty
    @Pattern(regexp = "^[A-Za-z0-9_-]{1,14}$")
    private String username;
    @NotEmpty
    @Size(min=4)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
