package ru.lprcup.backend.service.api;

import java.util.List;

import ru.lprcup.backend.service.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long userId);
    UserDto getUserByEmail(String email);
    UserDto updateUser(Long userId, UserDto userDto);
    boolean saveUser(UserDto user);
    void deleteUser(Long userId);
    List<UserDto> getAllUsers();
    UserDto authenticateUser(String email, String password);
}
