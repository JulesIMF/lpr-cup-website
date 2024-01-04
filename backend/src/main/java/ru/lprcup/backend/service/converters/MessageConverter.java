package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.UserDto;

@Component
@RequiredArgsConstructor
public class MessageConverter {
    public MessageDto toDto(Message message) {
        MessageDto messageDto = new MessageDto();
        messageDto.setId(message.getId());

        if (message.getFromUser() != null) {
            var user = new UserDto();
            user.setId(message.getFromUser().getId());
            user.setName(message.getFromUser().getName());
            user.setSurname(message.getFromUser().getSurname());
            user.setPatronymic(message.getFromUser().getPatronymic());
            user.setEmail(message.getFromUser().getEmail());
            messageDto.setFromUser(user);
        }

        if (message.getDialog() != null) {
            var dialog = new DialogDto();
            dialog.setId(message.getDialog().getId());
            messageDto.setDialog(dialog);
        }

        messageDto.setTime(message.getTime());
        messageDto.setText(message.getText());

        var fileConverter = new FileConverter();
        messageDto.setFile(fileConverter.toDto(message.getFile()));

        return messageDto;
    }

    public Message toEntity(MessageDto messageDto) {
        Message message = new Message();
        message.setId(messageDto.getId());

        if (message.getFromUser() != null) {
            var user = new User();
            user.setId(messageDto.getFromUser().getId());
            user.setName(messageDto.getFromUser().getName());
            user.setSurname(messageDto.getFromUser().getSurname());
            user.setPatronymic(messageDto.getFromUser().getPatronymic());
            user.setEmail(messageDto.getFromUser().getEmail());
            message.setFromUser(user);
        }

        if (message.getDialog() != null) {
            var dialog = new Dialog();
            dialog.setId(message.getDialog().getId());
            message.setDialog(dialog);
        }

        message.setTime(messageDto.getTime());
        message.setText(messageDto.getText());

        var fileConverter = new FileConverter();
        message.setFile(fileConverter.toEntity(messageDto.getFile()));

        return message;
    }
}