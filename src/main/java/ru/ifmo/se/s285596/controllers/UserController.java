package ru.ifmo.se.s285596.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.ifmo.se.s285596.models.User;
import ru.ifmo.se.s285596.services.UserService;

import java.security.Principal;

@CrossOrigin
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> user(Principal principal) {
        System.out.println(principal.getName() + " received");
        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) == null) {
            userService.save(user);
            return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User exists", HttpStatus.CONFLICT);
    }
}
