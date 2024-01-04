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
import org.springframework.stereotype.Service;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.Verdict;
import ru.lprcup.backend.repository.*;
import ru.lprcup.backend.service.api.MessageService;
import ru.lprcup.backend.service.converters.*;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
    private HashMap<Long, LocalDateTime> lastRequest = new HashMap<Long, LocalDateTime>();

    public static String escapeHtml(String input) {
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

    @Override
    public boolean postMessage(UserDto user, Long dialogId, String text, boolean isSubmission) {
        var dialog = dialogRepository.findById(dialogId);

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

        if (!user.getIsAdmin() && dialog.get().getId() > 0) {
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
