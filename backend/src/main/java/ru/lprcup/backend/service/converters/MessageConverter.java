package ru.lprcup.backend.service.converters;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.MessageDto;

@Component
@RequiredArgsConstructor
public class MessageConverter {
    public MessageDto toDto(Message message) {
        MessageDto messageDto = new MessageDto();
        messageDto.setId(message.getId());

        var userConverter = new UserConverter();
        messageDto.setFromUser(userConverter.toDto(message.getFromUser()));

        var dialogConverter = new DialogConverter();
        messageDto.setDialog(dialogConverter.toDto(message.getDialog()));

        messageDto.setTime(message.getTime());
        messageDto.setText(message.getText());

        var fileConverter = new FileConverter();
        messageDto.setFile(fileConverter.toDto(message.getFile()));

        return messageDto;
    }

    public Message toEntity(MessageDto messageDto) {
        Message message = new Message();
        message.setId(messageDto.getId());

        var userConverter = new UserConverter();
        message.setFromUser(userConverter.toEntity(messageDto.getFromUser()));

        var dialogConverter = new DialogConverter();
        message.setDialog(dialogConverter.toEntity(messageDto.getDialog()));

        message.setTime(messageDto.getTime());
        message.setText(messageDto.getText());

        var fileConverter = new FileConverter();
        message.setFile(fileConverter.toEntity(messageDto.getFile()));

        return message;
    }
}