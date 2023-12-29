package ru.lprcup.backend.controllers;


import java.util.List;
import java.util.Objects;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:*", maxAge = 3600)
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
//   private final BlogService blogService;
//   private final PlantService plantService;

//   @Autowired
//   private final JwtTokenProvider jwtTokenProvider;
//   private final JwtTokenRepository tokenRepository;

//   @Autowired
//   private final UserService userService;
//   private final UserConverter userConverter;
    
    // @GetMapping("/popular")
    // public ResponseEntity<List<BlogDto>> getPopularBlogs(@RequestParam String plantName) {
    //     List<BlogDto> popularBlogs = blogService.getPopularBlogs(plantName);
    //     return ResponseEntity.ok(popularBlogs);
    // }
}
