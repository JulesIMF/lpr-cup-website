/*
 * Filename: /home/jules_imf/source/doroshenkoiv-project/backend/src/main/java/ru/lprcup/backend/service/impl/GradeServiceImpl copy.java
 * Path: /home/jules_imf/source/doroshenkoiv-project/backend/src/main/java/ru/lprcup/backend/service/impl
 * Created Date: Friday, December 15th 2023, 12:24:31 pm
 * Author: JulesIMF
 * 
 * Copyright (c) 2023 Your Company
 */
package ru.lprcup.backend.service.impl;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Dialog;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.User;
import ru.lprcup.backend.data.Verdict;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.repository.DialogRepository;
import ru.lprcup.backend.repository.EpisodeRepository;
import ru.lprcup.backend.repository.GradeRepository;
import ru.lprcup.backend.repository.MessageRepository;
import ru.lprcup.backend.repository.SubmissionRepository;
import ru.lprcup.backend.repository.TaskRepository;
import ru.lprcup.backend.repository.UserRepository;
import ru.lprcup.backend.repository.VerdictRepository;
import ru.lprcup.backend.service.api.DialogService;
import ru.lprcup.backend.service.api.GradeService;
import ru.lprcup.backend.service.api.MessageService;
import ru.lprcup.backend.service.converters.DialogConverter;
import ru.lprcup.backend.service.converters.EpisodeConverter;
import ru.lprcup.backend.service.converters.GradeConverter;
import ru.lprcup.backend.service.converters.MessageConverter;
import ru.lprcup.backend.service.converters.UserConverter;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.RoleDto;
import ru.lprcup.backend.service.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final GradeRepository gradeRepository;
    private final GradeConverter gradeConverter;

    private final DialogRepository dialogRepository;
    private final DialogConverter dialogConverter;

    private final EpisodeRepository episodeRepository;
    private final EpisodeConverter episodeConverter;

    private final MessageRepository messageRepository;
    private final MessageConverter messageConverter;

    private final SubmissionRepository submissionRepository;
    private final TaskRepository taskRepository;
    private final VerdictRepository verdictRepository;

    private final UserConverter userConverter;
    private final UserRepository userRepository;

    protected static String escapeHtml(String input) {
        StringBuilder escaped = new StringBuilder();
        for (char c : input.toCharArray()) {
            switch (c) {
                case '<':
                    escaped.append("&lt;");
                    break;
                case '>':
                    escaped.append("&gt;");
                    break;
                case '&':
                    escaped.append("&amp;");
                    break;
                case '"':
                    escaped.append("&quot;");
                    break;
                case '\'':
                    escaped.append("&#39;");
                    break;
                case '\n':
                    escaped.append("<br/>");
                    break;
                default:
                    escaped.append(c);
            }
        }
        return escaped.toString();
    }

    private HashMap<Long, LocalDateTime> lastRequest = new HashMap<Long, LocalDateTime>();

    @Override
    public boolean postMessage(UserDto user, Long dialogId, String text, boolean isSubmission) {
        var dialog = dialogRepository.findById(dialogId);
        if (dialog == null) {
            return false;
        }

        if (!user.getIsAdmin()) {
            if (dialog.get().getStudent() == null) {
                return false;
            }

            if (dialog.get().getStudent().getId() != user.getId()) {
                return false;
            }
        }

        var message = new Message();
        message.setText(escapeHtml(text));
        message.setFromUser(userRepository.findById(user.getId()).get());
        message.setTime(LocalDateTime.now());
        message.setDialog(dialog.get());
        message = messageRepository.save(message);

        var newDialog = dialog.get();
        newDialog.setLastMessage(message.getTime());

        if (isSubmission) {
            var submission = new Submission();
            submission.setEpisode(dialog.get().getEpisode());
            submission.setMessage(message);
            submission.setNumber(submissionRepository.countByEpisodeAndStudent(dialog.get().getEpisode(),
                    userRepository.findById(user.getId()).get()) + 1);
            submission.setStudent(userRepository.findById(user.getId()).get());
            submission = submissionRepository.save(submission);
            message.setText(
                    "<a href=\"/lprcup/submission?id=" + submission.getId() +
                            "\">Попытка #" + submission.getNumber() +
                            "</a><br/><br/>" +
                            message.getText());

            for (var task : taskRepository.findByEpisode(dialog.get().getEpisode())) {
                var verdict = new Verdict();
                verdict.setCode("N");
                verdict.setSubmission(submission);
                verdict.setTask(task);
                verdictRepository.save(verdict);
            }

            newDialog.setLastSubmission(message.getTime());
        }

        dialogRepository.save(newDialog);

        return true;
    }

    private LocalDateTime setRequest(Long userId) {
        return lastRequest.put(userId, LocalDateTime.now());
    }

    @Override
    public List<MessageDto> getAllMessages(UserDto user, Long dialogId) {
        var dialog = dialogRepository.findById(dialogId);
        if (dialog == null) {
            return null;
        }

        if (!user.getIsAdmin()) {
            if (dialog.get().getStudent() != null && dialog.get().getStudent().getId() != user.getId()) {
                return null;
            }
        }

        setRequest(user.getId());
        return dialogConverter.toDto(dialog.get()).getMessages();
    }

    @Override
    public List<MessageDto> getNewMessages(UserDto user, Long dialogId) {
        var dialog = dialogRepository.findById(dialogId);
        if (dialog == null) {
            return null;
        }

        if (!user.getIsAdmin()) {
            if (dialog.get().getStudent() != null && dialog.get().getStudent().getId() != user.getId()) {
                return null;
            }
        }
        
        var messages = messageRepository.findNewMessages(dialog.get(), setRequest(user.getId()));
        var dto = new ArrayList<MessageDto>();
        for (var m : messages) {
            dto.add(messageConverter.toDto(m));
        }

        return dto;
    }
}
