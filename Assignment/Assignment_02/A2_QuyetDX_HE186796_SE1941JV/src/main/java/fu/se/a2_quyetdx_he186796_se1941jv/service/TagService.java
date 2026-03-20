package fu.se.a2_quyetdx_he186796_se1941jv.service;

import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.TagResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository repository;

    public List<TagResponse> getAll() {
        return repository.findAll().stream()
                .map(tag -> TagResponse.builder()
                        .tagId(tag.getTagId())
                        .tagName(tag.getTagName())
                        .note(tag.getNote())
                        .build())
                .collect(Collectors.toList());
    }
}
