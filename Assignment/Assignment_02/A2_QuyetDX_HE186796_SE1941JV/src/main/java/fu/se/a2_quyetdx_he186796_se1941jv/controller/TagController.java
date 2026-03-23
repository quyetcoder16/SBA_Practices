package fu.se.a2_quyetdx_he186796_se1941jv.controller;

import fu.se.a2_quyetdx_he186796_se1941jv.constant.ApiConstants;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.ApiBaseResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.TagResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.TAG_ROOT)
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ApiBaseResponse<List<TagResponse>> getAll() {
        return ApiBaseResponse.<List<TagResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(tagService.getAll())
                .build();
    }
}
