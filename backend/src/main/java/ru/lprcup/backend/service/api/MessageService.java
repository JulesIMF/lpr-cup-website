package ru.lprcup.backend.service.api;

import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.List;


public interface MessageService {
    public boolean postMessage(UserDto user, Long dialogId, String text, boolean isSubmission);

    public List<MessageDto> getAllMessages(UserDto user, Long dialogId);

    public List<MessageDto> getNewMessages(UserDto user, Long dialogId);
}
