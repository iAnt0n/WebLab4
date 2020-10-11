package ru.ifmo.se.s285596.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ifmo.se.s285596.models.Points;
import ru.ifmo.se.s285596.models.User;
import ru.ifmo.se.s285596.repositories.UserRepository;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    public void save(User user){
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
}
