package ru.lprcup.backend.service.api;

import ru.lprcup.backend.service.dto.SubmissionDto;
import ru.lprcup.backend.service.dto.UserDto;

import java.util.Map;


public interface SubmissionService {
    public SubmissionDto getSubmission(UserDto user, Long submissionId);

    ;

    public boolean patchSubmission(UserDto user, SubmissionPatch patch);

    public static class SubmissionPatch {
        public Long submissionId;
        public Map<String, String> verdicts;
    }
}
