package ru.ifmo.se.s285596;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class PointController {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    @Autowired
    public PointController(PointRepository pointRepository, UserRepository userRepository) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/points/")
    public List<Points> getAll(Principal user) {
        return (List<Points>) pointRepository.getAllByUser(userRepository.findByUsername(user.getName()));
    }

//    @GetMapping("/points/{id}")
//    public Points getPoint(@PathVariable int id, Principal user) {
//        return pointRepository.getByIdAndUser(id, user.getName()).orElse(null);
//    }

    @PostMapping("/points/")
    public void addPoint(@RequestBody Points points, Principal user) {
        points.setReqTime(LocalDateTime.now());
        points.calculate();
        points.setUser(userRepository.findByUsername(user.getName()));
        pointRepository.save(points);
    }

}

