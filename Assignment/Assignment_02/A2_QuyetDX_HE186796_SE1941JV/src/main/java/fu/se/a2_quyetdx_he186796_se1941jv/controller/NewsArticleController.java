package fu.se.a2_quyetdx_he186796_se1941jv.controller;

import fu.se.a2_quyetdx_he186796_se1941jv.constant.ApiConstants;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.NewsArticleRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.ApiBaseResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.NewsArticleResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.service.NewsArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.NEWS_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class NewsArticleController {

    private final NewsArticleService newsArticleService;

    @GetMapping
    public ApiBaseResponse<List<NewsArticleResponse>> getAll(@RequestParam(required = false) Boolean active) {

        return ApiBaseResponse.<List<NewsArticleResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(newsArticleService.getAll())
                .build();
    }

    @GetMapping("/active")
    public ApiBaseResponse<List<NewsArticleResponse>> getAllActive() {
        return ApiBaseResponse.<List<NewsArticleResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(newsArticleService.getAllActive())
                .build();
    }

    @GetMapping("/my")
    public ApiBaseResponse<List<NewsArticleResponse>> getMyArticles() {
        return ApiBaseResponse.<List<NewsArticleResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(newsArticleService.getMyArticles())
                .build();
    }

    @GetMapping("/{id}")
    public ApiBaseResponse<NewsArticleResponse> getById(@PathVariable Integer id) {
        return ApiBaseResponse.<NewsArticleResponse>builder()
                .statusCode(1000)
                .message("Success")
                .result(newsArticleService.getById(id))
                .build();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ApiBaseResponse<NewsArticleResponse> create(@RequestBody NewsArticleRequest request) {
        return ApiBaseResponse.<NewsArticleResponse>builder()
                .statusCode(1000)
                .message("News article created successfully")
                .result(newsArticleService.create(request))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ApiBaseResponse<NewsArticleResponse> update(@PathVariable Integer id, @RequestBody NewsArticleRequest request) {
        return ApiBaseResponse.<NewsArticleResponse>builder()
                .statusCode(1000)
                .message("News article updated successfully")
                .result(newsArticleService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ApiBaseResponse<Void> delete(@PathVariable Integer id) {
        newsArticleService.delete(id);
        return ApiBaseResponse.<Void>builder()
                .statusCode(1000)
                .message("News article deleted successfully")
                .build();
    }
}
