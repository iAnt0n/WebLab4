package ru.ifmo.se.s285596.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.ifmo.se.s285596.models.Points;
import ru.ifmo.se.s285596.models.User;
import ru.ifmo.se.s285596.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder encoder){
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    public void save(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<Points> getUserPoints(String name) {
        User user = userRepository.findByUsername(name);
        return user.getPointsList();
    }

    public void addUserPoints(String name, Points points) {
        User user = userRepository.findByUsername(name);
        user.getPointsList().add(points);
        userRepository.save(user);
    }

    public void deleteAll(String name) {
        User user = userRepository.findByUsername(name);
        user.getPointsList().clear();
        userRepository.save(user);
    }
}
