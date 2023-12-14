package ru.lprcup.backend.service.converters;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.lprcup.backend.data.File;
import ru.lprcup.backend.data.Grade;
import ru.lprcup.backend.service.dto.FileDto;
import ru.lprcup.backend.service.dto.GradeDto;

@Component
@RequiredArgsConstructor
public class FileConverter {
    public FileDto toDto(File file) {
        if (file == null) {
            return null;
        }

        FileDto fileDto = new FileDto();
        fileDto.setId(file.getId());
        fileDto.setName(file.getName());
        return fileDto;
    }

    public File toEntity(FileDto fileDto) {
        if (fileDto == null) {
            return null;
        }
        
        File file = new File();
        file.setId(fileDto.getId());
        file.setName(fileDto.getName());
        return file;
    }
}
