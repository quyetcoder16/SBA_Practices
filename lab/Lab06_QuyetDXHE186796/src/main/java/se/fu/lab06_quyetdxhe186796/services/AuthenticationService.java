package se.fu.lab06_quyetdxhe186796.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import se.fu.lab06_quyetdxhe186796.dtos.LoginUserDto;
import se.fu.lab06_quyetdxhe186796.dtos.RegisterUserDto;
import se.fu.lab06_quyetdxhe186796.entities.User;
import se.fu.lab06_quyetdxhe186796.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository,
                                 AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        var user = new User().setFullName(input.getFullName()).setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()));
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
}
