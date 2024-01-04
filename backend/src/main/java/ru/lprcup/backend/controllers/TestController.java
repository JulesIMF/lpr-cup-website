package ru.lprcup.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:*", maxAge = 3600)
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
