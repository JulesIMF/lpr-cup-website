package ru.lprcup.backend.controllers;

import java.util.List;
import java.util.Objects;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.security.JwtTokenProvider;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.api.JwtTokenService;
import ru.lprcup.backend.service.api.UserService;
import ru.lprcup.backend.service.dto.JwtTokenDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

class GradeDescription {
    public Long grade;
    public Long season;
}

@CrossOrigin(origins = "http://localhost:*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private final GradeService gradeService;

    @GetMapping("/seasons")
    public ResponseEntity<?> getSeasons(
            @RequestHeader("Authorization") final String jwtToken) {
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        return ResponseEntity.ok(user.getGrades());
    }

    @GetMapping("/episodesCount")
    public ResponseEntity<?> getEpisodesCount(
            @RequestHeader("Authorization") final String jwtToken,
            @RequestBody final GradeDescription grade) {

        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        return ResponseEntity.ok(gradeService.getEpisodesCount(grade.season, grade.grade));
    }
}
