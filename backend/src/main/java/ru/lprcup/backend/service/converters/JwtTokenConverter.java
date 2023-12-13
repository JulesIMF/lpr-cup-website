package ru.lprcup.backend.service.converters;

import org.springframework.stereotype.Component;

import ru.lprcup.backend.data.JwtToken;
import ru.lprcup.backend.service.dto.JwtTokenDto;

@Component
public class JwtTokenConverter {
    public JwtTokenDto toDto(JwtToken token) {
        JwtTokenDto tokenDto = new JwtTokenDto();
        tokenDto.setId(token.getId());
        tokenDto.setToken(token.getToken());
        return tokenDto;
    }

    public JwtToken toEntity(JwtTokenDto tokenDto) {
        JwtToken token = new JwtToken();
        token.setId(tokenDto.getId());
        token.setToken(tokenDto.getToken());
        return token;
    }
}
