package ru.ifmo.se.s285596.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.s285596.models.Points;
import ru.ifmo.se.s285596.services.UserService;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class PointController {
    private final UserService userService;

    @Autowired
    public PointController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/points")
    public List<Points> getAll(Principal user) {
        return userService.getUserPoints(user.getName());
    }

    @PostMapping("/points")
    public void addPoint(@RequestBody Points points, Principal user) {
        points.setReqTime(LocalDateTime.now());
        points.calculate();
        userService.addUserPoints(user.getName(), points);
    }

}

