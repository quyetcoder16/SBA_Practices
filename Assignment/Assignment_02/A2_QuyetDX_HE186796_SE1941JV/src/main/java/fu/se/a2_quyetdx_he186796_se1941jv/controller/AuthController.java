package fu.se.a2_quyetdx_he186796_se1941jv.controller;

import fu.se.a2_quyetdx_he186796_se1941jv.constant.ApiConstants;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.LoginRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.RegisterRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.ApiBaseResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.AuthResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiConstants.AUTH_ROOT)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiBaseResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiBaseResponse.<AuthResponse>builder()
                .statusCode(1000)
                .message("Login successful")
                .result(authService.login(request))
                .build();
    }

    @PostMapping("/register")
    public ApiBaseResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiBaseResponse.<AuthResponse>builder()
                .statusCode(1000)
                .message("Registration successful")
                .result(authService.register(request))
                .build();
    }
}
