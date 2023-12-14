package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Episode;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Task;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.EpisodeDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.TaskDto;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class DialogConverter {
    public DialogDto toDto(Dialog dialog) {
        DialogDto dialogDto = new DialogDto();
        dialogDto.setId(dialog.getId());

        var episodeConverter = new EpisodeConverter();
        dialogDto.setEpisode(episodeConverter.toDto(dialog.getEpisode()));


        var userConverter = new UserConverter();
        dialogDto.setStudent(userConverter.toDto(dialog.getStudent()));

        dialogDto.setLastMessage(dialog.getLastMessage());
        dialogDto.setLastSubmission(dialog.getLastSubmission());

        ArrayList<MessageDto> messages = new ArrayList<MessageDto>();
        var messageConverter = new MessageConverter();
        for (var message : dialog.getMessages()) {
            messages.add(messageConverter.toDto(message));
        }
        dialogDto.setMessages(messages.stream().toList());

        return dialogDto;
    }
    public Dialog toEntity(DialogDto dialogDto) {
        Dialog dialog = new Dialog();
        dialog.setId(dialogDto.getId());

        var episodeConverter = new EpisodeConverter();
        dialog.setEpisode(episodeConverter.toEntity(dialogDto.getEpisode()));


        var userConverter = new UserConverter();
        dialog.setStudent(userConverter.toEntity(dialogDto.getStudent()));

        dialog.setLastMessage(dialogDto.getLastMessage());
        dialog.setLastSubmission(dialogDto.getLastSubmission());

        ArrayList<Message> messages = new ArrayList<Message>();
        var messageConverter = new MessageConverter();
        for (var message : dialogDto.getMessages()) {
            messages.add(messageConverter.toEntity(message));
        }
        dialog.setMessages(messages.stream().toList());

        return dialog;
    }
}