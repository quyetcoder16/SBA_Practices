package fu.se.a2_quyetdx_he186796_se1941jv.controller;

import fu.se.a2_quyetdx_he186796_se1941jv.constant.ApiConstants;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.SystemAccountRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.ApiBaseResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.SystemAccountResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.service.SystemAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.USER_ROOT)
@RequiredArgsConstructor
public class SystemAccountController {

    private final SystemAccountService systemAccountService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<List<SystemAccountResponse>> getAll() {
        return ApiBaseResponse.<List<SystemAccountResponse>>builder()
                .statusCode(1000)
                .message("Success")
                .result(systemAccountService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<SystemAccountResponse> getById(@PathVariable Integer id) {
        return ApiBaseResponse.<SystemAccountResponse>builder()
                .statusCode(1000)
                .message("Success")
                .result(systemAccountService.getById(id))
                .build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<SystemAccountResponse> create(@RequestBody SystemAccountRequest request) {
        return ApiBaseResponse.<SystemAccountResponse>builder()
                .statusCode(1000)
                .message("Account created successfully")
                .result(systemAccountService.create(request))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<SystemAccountResponse> update(@PathVariable Integer id, @RequestBody SystemAccountRequest request) {
        return ApiBaseResponse.<SystemAccountResponse>builder()
                .statusCode(1000)
                .message("Account updated successfully")
                .result(systemAccountService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiBaseResponse<Void> delete(@PathVariable Integer id) {
        systemAccountService.delete(id);
        return ApiBaseResponse.<Void>builder()
                .statusCode(1000)
                .message("Account deleted successfully")
                .build();
    }
}
