package ru.lprcup.backend.service.converters;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.data.Verdict;
import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.VerdictDto;

@Component
@RequiredArgsConstructor
public class VerdictConverter {
    public VerdictDto toDto(Verdict verdict) {
        VerdictDto verdictDto = new VerdictDto();
        verdictDto.setId(verdict.getId());

        var submission = new SubmissionDto();
        submission.setId(verdict.getSubmission().getId());
        verdictDto.setSubmission(submission);

        var taskConverter = new TaskConverter();
        verdictDto.setTask(taskConverter.toDto(verdict.getTask()));

        verdictDto.setCode(verdict.getCode());
        return verdictDto;
    }

    public Verdict toEntity(VerdictDto verdictDto) {
        Verdict verdict = new Verdict();
        verdict.setId(verdictDto.getId());

        var submission = new Submission();
        submission.setId(verdict.getSubmission().getId());
        verdict.setSubmission(submission);

        var taskConverter = new TaskConverter();
        verdict.setTask(taskConverter.toEntity(verdictDto.getTask()));

        verdict.setCode(verdictDto.getCode());
        return verdict;
    }
}