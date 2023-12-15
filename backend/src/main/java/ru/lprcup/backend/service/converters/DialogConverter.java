package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.TaskDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class DialogConverter {
    public DialogDto toDto(Dialog dialog) {
        DialogDto dialogDto = new DialogDto();
        dialogDto.setId(dialog.getId());

        var episode = new EpisodeDto();
        episode.setId(dialog.getEpisode().getId());
        episode.setNumber(dialog.getEpisode().getNumber());
        dialogDto.setEpisode(episode);

        if (dialog.getStudent() != null) {
            var user = new UserDto();
            user.setId(dialog.getStudent().getId());
            user.setEmail(dialog.getStudent().getEmail());
            user.setName(dialog.getStudent().getName());
            user.setSurname(dialog.getStudent().getSurname());
            user.setPatronymic(dialog.getStudent().getPatronymic());
            user.setIsAdmin(dialog.getStudent().getIsAdmin());
            dialogDto.setStudent(user);
        }
        else {
            dialogDto.setStudent(null);
        }

        dialogDto.setLastMessage(dialog.getLastMessage());
        dialogDto.setLastSubmission(dialog.getLastSubmission());

        ArrayList<MessageDto> messages = new ArrayList<MessageDto>();
        var messageConverter = new MessageConverter();
        if (dialog.getMessages() != null) {
            for (var message : dialog.getMessages()) {
                messages.add(messageConverter.toDto(message));
            }
        }

        dialogDto.setMessages(messages.stream().toList());

        return dialogDto;
    }

    public Dialog toEntity(DialogDto dialogDto) {
        Dialog dialog = new Dialog();
        dialog.setId(dialogDto.getId());

        var episode = new Episode();
        episode.setId(dialogDto.getEpisode().getId());
        episode.setNumber(dialogDto.getEpisode().getNumber());
        dialog.setEpisode(episode);

        if (dialogDto.getStudent() != null) {
            var user = new User();
            user.setId(dialogDto.getStudent().getId());
            user.setEmail(dialogDto.getStudent().getEmail());
            user.setName(dialogDto.getStudent().getName());
            user.setSurname(dialogDto.getStudent().getSurname());
            user.setPatronymic(dialogDto.getStudent().getPatronymic());
            user.setIsAdmin(dialogDto.getStudent().getIsAdmin());
            dialog.setStudent(user);
        }
        else {
            dialog.setStudent(null);
        }

        dialog.setLastMessage(dialogDto.getLastMessage());
        dialog.setLastSubmission(dialogDto.getLastSubmission());

        ArrayList<Message> messages = new ArrayList<Message>();
        var messageConverter = new MessageConverter();
        if (dialogDto.getMessages() != null) {
            for (var message : dialogDto.getMessages()) {
                messages.add(messageConverter.toEntity(message));
            }
        }

        dialog.setMessages(messages.stream().toList());

        return dialog;
    }
}