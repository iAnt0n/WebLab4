package ru.ifmo.se.s285596.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.ifmo.se.s285596.models.User;
import ru.ifmo.se.s285596.models.UserDTO;
import ru.ifmo.se.s285596.services.UserDetailsServiceImpl;
import ru.ifmo.se.s285596.services.UserService;
import ru.ifmo.se.s285596.utils.TokenUtil;

import javax.validation.Valid;

@CrossOrigin
@RestController
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final TokenUtil tokenUtil;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager,
                          UserDetailsServiceImpl userDetailsService, TokenUtil tokenUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.tokenUtil = tokenUtil;
    }

    @PostMapping("/authentication")
    public ResponseEntity<String> createAuthToken(@RequestBody UserDTO userDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            return new ResponseEntity<>("Wrong login or password", HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userDTO.getUsername());

        final String jwt = tokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/users")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        User user = new User(userDTO.getUsername(), userDTO.getPassword());
        if (userService.findByUsername(user.getUsername()) == null) {
            userService.save(user);
            return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User exists", HttpStatus.CONFLICT);
    }
}
