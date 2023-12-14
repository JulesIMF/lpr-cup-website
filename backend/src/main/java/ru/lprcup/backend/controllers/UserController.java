package ru.lprcup.backend.controllers;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.security.JwtTokenProvider;
import ru.lprcup.backend.security.UserPrincipal;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.api.JwtTokenService;
import ru.lprcup.backend.service.api.RoleService;
import ru.lprcup.backend.service.api.UserService;
import ru.lprcup.backend.service.converters.UserConverter;
import ru.lprcup.backend.service.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;
    private final RoleService roleService;
    private final GradeService gradeService;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
    private final UserConverter userConverter;

    @GetMapping("/info/{userId}")
    public ResponseEntity<?> getInfoById(
            @RequestHeader("Authorization") final String jwtToken,
            @PathVariable Long userId) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long userIdFromDb = jwtTokenProvider.getUserIdFromToken(jwtToken);
        if (!Objects.equals(userIdFromDb, userId)) {
            return ResponseEntity.badRequest().body("Invalid operation");
        }

        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        if (userService.getUserByEmail(authRequest.getEmail()) == null) {
            return ResponseEntity.status(403).body("Invalid credentials");
        }

        UserDto user = userService.authenticateUser(authRequest.getEmail(), authRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(403).body("Invalid credentials");
        }

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRoles());
        jwtTokenService.createToken(new JwtTokenDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), token));
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestHeader("Authorization") final String jwtToken) {
        if (!jwtTokenProvider.validateToken(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        Long id = jwtTokenProvider.getUserIdFromToken(jwtToken);
        UserDto user = userService.getUserById(id);
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") final String jwtToken) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        } else {
            jwtTokenService.deleteById(token.getId());
        }

        return ResponseEntity.ok().body("Logged out");
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody final SignUpRequest signUpRequest) {
        UserDto userDto = signUpRequest.toUserDto();

        userDto.setGrades(gradeService.getActualGrades(signUpRequest.getParticipationGrades()));

        RoleDto role = roleService.getRoleByName("USER");
        if (role == null) {
            role = roleService.createRole(new RoleDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), "USER"));
        }
        userDto.setRoles(List.of(role));
        if (!userService.saveUser(userDto)) {
            return ResponseEntity.badRequest().body("User with such email exists");
        }

        User user = userConverter.toEntity(userService.getUserByEmail(userDto.getEmail()));
        String token = jwtTokenProvider.generateToken(new UserPrincipal(user.getId(), user.getEmail(),
                user.getPassword(), user.getRoles()));
        jwtTokenService.createToken(new JwtTokenDto(Math.abs(UUID.randomUUID().getLeastSignificantBits()), token));
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
