package ru.lprcup.backend.controllers;

import java.util.List;
import java.util.Objects;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.security.JwtTokenProvider;
import ru.lprcup.backend.service.api.DialogService;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.api.JwtTokenService;
import ru.lprcup.backend.service.api.UserService;
import ru.lprcup.backend.service.dto.JwtTokenDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private final GradeService gradeService;
    private final DialogService dialogService;

    @GetMapping("/seasons")
    public ResponseEntity<?> getSeasons(
            @RequestHeader("ApiToken") final String jwtToken) {
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
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long season,
            @RequestParam final Long grade) {
        if (grade == null || season == null) {
            return ResponseEntity.badRequest().body("Null options");
        }
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        return ResponseEntity.ok(gradeService.getEpisodesCount(season, grade));
    }

    @GetMapping("/adminDialog")
    public ResponseEntity<?> getAdminDialog(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long season,
            @RequestParam final Long grade,
            @RequestParam final Long episode) {
        if (grade == null || season == null || episode == null) {
            return ResponseEntity.badRequest().body("Null options");
        }
        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        var dialog = dialogService.getAdminDialog(user, season, grade, episode);
        if (dialog == null) {
            return ResponseEntity.notFound().build();
        }

        dialog.setMessages(null);
        return ResponseEntity.ok(dialog);
    }

    @GetMapping("/studentDialogs")
    public ResponseEntity<?> getStudentDialogs(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long season,
            @RequestParam final Long grade,
            @RequestParam final Long episode) {
        if (grade == null || season == null || episode == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        if (!jwtTokenProvider.validateToken(jwtToken) || token == null) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (!user.getIsAdmin()) {
            return ResponseEntity.status(403).build();
        }

        var dialogs = dialogService.getStudentDialogs(season, grade, episode);
        if (dialogs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dialogs);
    }
}
