package ru.lprcup.backend.service.api;

import java.util.Set;

import ru.lprcup.backend.data.Submission;
import ru.lprcup.backend.service.dto.DialogDto;
import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.List;
import java.util.Map;


public interface SubmissionService {
    public static class SubmissionPatch {
        public Long submissionId;
        public Map<String, String> verdicts;
    };

    public SubmissionDto getSubmission(UserDto user, Long submissionId);
    public boolean patchSubmission(UserDto user, SubmissionPatch patch);
}
