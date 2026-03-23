package fu.se.a2_quyetdx_he186796_se1941jv.controller;

import fu.se.a2_quyetdx_he186796_se1941jv.constant.ApiConstants;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.CategoryRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.ApiBaseResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.CategoryResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.CATEGORY_ROOT)
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiBaseResponse<List<CategoryResponse>> getAll() {
        return ApiBaseResponse.<List<CategoryResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(categoryService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiBaseResponse<CategoryResponse> getById(@PathVariable Integer id) {
        return ApiBaseResponse.<CategoryResponse>builder()
                .statusCode(1000)
                .message("Success")
                .result(categoryService.getById(id))
                .build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<CategoryResponse> create(@RequestBody CategoryRequest request) {
        return ApiBaseResponse.<CategoryResponse>builder()
                .statusCode(1000)
                .message("Category created successfully")
                .result(categoryService.create(request))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<CategoryResponse> update(@PathVariable Integer id, @RequestBody CategoryRequest request) {
        return ApiBaseResponse.<CategoryResponse>builder()
                .statusCode(1000)
                .message("Category updated successfully")
                .result(categoryService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<Void> delete(@PathVariable Integer id) {
        categoryService.delete(id);
        return ApiBaseResponse.<Void>builder()
                .statusCode(1000)
                .message("Category deleted successfully")
                .build();
    }
}
