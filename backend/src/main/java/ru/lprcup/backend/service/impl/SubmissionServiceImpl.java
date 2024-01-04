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
import ru.lprcup.backend.repository.*;
import ru.lprcup.backend.service.api.SubmissionService;
import ru.lprcup.backend.service.converters.*;
import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {
    private final GradeRepository gradeRepository;
    private final GradeConverter gradeConverter;

    private final DialogRepository dialogRepository;
    private final DialogConverter dialogConverter;

    private final EpisodeRepository episodeRepository;
    private final EpisodeConverter episodeConverter;

    private final SubmissionRepository submissionRepository;
    private final SubmissionConverter submissionConverter;

    private final VerdictRepository verdictRepository;
    private final MessageRepository messageRepository;

    private final UserConverter userConverter;
    private final UserRepository userRepository;

    @Override
    public SubmissionDto getSubmission(UserDto user, Long submissionId) {
        var submission = submissionRepository.findById(submissionId).get();
        if (submission == null) {
            return null;
        }

        if (!user.getIsAdmin() && submission.getStudent().getId() != user.getId()) {
            return null;
        }

        var submissionDto = submissionConverter.toDto(submission);
        submissionDto.getEpisode().setDialogs(null);
        submissionDto.setMessage(null);

        return submissionDto;
    }

    @Override
    public boolean patchSubmission(UserDto user, SubmissionPatch patch) {
        var submission = submissionRepository.findById(patch.submissionId).get();
        if (submission == null) {
            return false;
        }

        if (!user.getIsAdmin()) {
            return false;
        }

        for (var verdict : submission.getVerdicts()) {
            if (patch.verdicts.containsKey(verdict.getTask().getName())) {
                verdict.setCode(patch.verdicts.get(verdict.getTask().getName()));
                verdictRepository.save(verdict);
            }
        }

        var message = new Message();
        message.setText(
                "<a href=\"/lprcup/submission?id=" + submission.getId() +
                        "\">Попытка #" + submission.getNumber() +
                        "</a> проверена!");
        message.setFromUser(userRepository.findById(user.getId()).get());
        message.setTime(LocalDateTime.now());
        message.setDialog(submission.getMessage().getDialog());
        message = messageRepository.save(message);

        return true;
    }
}
