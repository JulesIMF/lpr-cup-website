package ru.lprcup.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.lprcup.backend.security.JwtTokenProvider;
import ru.lprcup.backend.service.api.*;
import ru.lprcup.backend.service.dto.JwtTokenDto;
import ru.lprcup.backend.service.dto.UserDto;

class MessageParams {
    public Long dialogId;
    public String text;
    public Boolean isSubmission;
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
    private final DialogService dialogService;
    private final MessageService messageService;
    private final SubmissionService submissionService;
    private final EpisodeService episodeService;

    private boolean tokenInvalid(String jwtToken) {
        if (jwtToken == null) {
            return true;
        }

        JwtTokenDto token = jwtTokenService.getTokenByName(jwtToken);
        return !jwtTokenProvider.validateToken(jwtToken) || token == null;
    }

    private UserDto getUserFromToken(String jwtToken) {
        return userService.getUserById(jwtTokenProvider.getUserIdFromToken(jwtToken));
    }

    @GetMapping("/seasons")
    public ResponseEntity<?> getSeasons(
            @RequestHeader("ApiToken") final String jwtToken) {
        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (user.getIsAdmin()) {
            return ResponseEntity.ok(
                    gradeService.getAllGrades()
            );
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
        if (tokenInvalid(jwtToken)) {
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
        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
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

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
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

    @PostMapping("/postMessage")
    public ResponseEntity<?> postMessage(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestBody final MessageParams params) {
        if (params.dialogId == null || params.text == null || params.isSubmission == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        var success = messageService.postMessage(user, params.dialogId, params.text, params.isSubmission);

        return success ? ResponseEntity.ok().build() : ResponseEntity.status(403).build();
    }

    @GetMapping("/allMessages")
    public ResponseEntity<?> getAllMessages(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long dialogId) {
        if (dialogId == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        var messages = messageService.getAllMessages(user, dialogId);
        if (messages == null) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(messages);
    }

    @GetMapping("/newMessages")
    public ResponseEntity<?> getNewMessages(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long dialogId) {
        if (dialogId == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        var messages = messageService.getNewMessages(user, dialogId);
        if (messages == null) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(messages);
    }

    @GetMapping("/submission")
    public ResponseEntity<?> getSubmission(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestParam final Long submissionId) {
        if (submissionId == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        var submission = submissionService.getSubmission(user, submissionId);

        return submission != null ? ResponseEntity.ok().body(submission) : ResponseEntity.status(403).build();
    }

    @PatchMapping("/patchSubmission")
    public ResponseEntity<?> patchSubmission(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestBody final SubmissionService.SubmissionPatch patch) {
        if (patch.verdicts == null || patch.submissionId == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        return submissionService.patchSubmission(user, patch) ? ResponseEntity.ok().build() : ResponseEntity.status(403).build();
    }

    @PostMapping("/newGrade")
    public ResponseEntity<?> newGrade(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestBody final GradeService.NewSeasonParams params) {
        if (params.year == null || params.season == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (!user.getIsAdmin()) {
            return ResponseEntity.status(403).build();
        }

        gradeService.addNewSeason(params);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/newEpisode")
    public ResponseEntity<?> newEpisode(
            @RequestHeader("ApiToken") final String jwtToken,
            @RequestBody final EpisodeService.NewEpisodeParams params) {
        if (params.grade == null || params.season == null) {
            return ResponseEntity.badRequest().body("Null options");
        }

        if (tokenInvalid(jwtToken)) {
            return ResponseEntity.badRequest().body("No such token");
        }

        UserDto user = getUserFromToken(jwtToken);
        if (!user.getIsAdmin()) {
            return ResponseEntity.status(403).build();
        }

        episodeService.addNewEpisode(params);

        return ResponseEntity.ok().build();
    }
}
