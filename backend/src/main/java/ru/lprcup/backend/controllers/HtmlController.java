package ru.lprcup.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HtmlController {
    @GetMapping(value = {
                    "/",
                    "/grades",
                    "/signup",
                    "/login",
                    "/restoration",
                    "/info",
                    "/lprcup",
                    "/404",
    })
    public String index() {
        return "index"; // Возвращает имя HTML страницы без расширения
    }
}

