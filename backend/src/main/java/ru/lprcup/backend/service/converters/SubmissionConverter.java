package ru.lprcup.backend.service.converters;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.data.Message;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.Verdict;
import ru.lprcup.backend.service.dto.GradeDto;
import ru.lprcup.backend.service.dto.MessageDto;
import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.VerdictDto;

@Component
@RequiredArgsConstructor
public class SubmissionConverter {
    public SubmissionDto toDto(Submission submission) {
        SubmissionDto submissionDto = new SubmissionDto();
        submissionDto.setId(submission.getId());

        var episodeConverter = new EpisodeConverter();
        submissionDto.setEpisode(episodeConverter.toDto(submission.getEpisode()));

        var userConverter = new UserConverter();
        submissionDto.setStudent(userConverter.toDto(submission.getStudent()));

        var messageConverter = new MessageConverter();
        submissionDto.setMessage(messageConverter.toDto(submission.getMessage()));

        submissionDto.setNumber(submission.getNumber());

        ArrayList<VerdictDto> verdicts = new ArrayList<VerdictDto>();
        var verdictConverter = new VerdictConverter();
        for (var verdict : submission.getVerdicts()) {
            verdicts.add(verdictConverter.toDto(verdict));
        }
        submissionDto.setVerdicts(verdicts.stream().toList());

        return submissionDto;
    }

    public Submission toEntity(SubmissionDto submissionDto) {
        Submission submission = new Submission();
        submission.setId(submissionDto.getId());

        var episodeConverter = new EpisodeConverter();
        submission.setEpisode(episodeConverter.toEntity(submissionDto.getEpisode()));

        var userConverter = new UserConverter();
        submission.setStudent(userConverter.toEntity(submissionDto.getStudent()));

        var messageConverter = new MessageConverter();
        submission.setMessage(messageConverter.toEntity(submissionDto.getMessage()));

        submission.setNumber(submissionDto.getNumber());

        ArrayList<Verdict> verdicts = new ArrayList<Verdict>();
        var verdictConverter = new VerdictConverter();
        for (var verdict : submissionDto.getVerdicts()) {
            verdicts.add(verdictConverter.toEntity(verdict));
        }
        submission.setVerdicts(verdicts.stream().toList());

        return submission;
    }
}