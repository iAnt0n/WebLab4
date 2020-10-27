package ru.ifmo.se.s285596.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.s285596.models.PointDTO;
import ru.ifmo.se.s285596.models.Points;
import ru.ifmo.se.s285596.services.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
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
    public Points addPoint(@RequestBody @Valid PointDTO point, Principal user) {
        Points points = new Points(point);
        points.setReqTime(LocalDateTime.now());
        points.calculate();
        userService.addUserPoints(user.getName(), points);
        return points;
    }

    @DeleteMapping("/points")
    public void deleteAll(Principal user) {
        userService.deleteAll(user.getName());
    }

}

