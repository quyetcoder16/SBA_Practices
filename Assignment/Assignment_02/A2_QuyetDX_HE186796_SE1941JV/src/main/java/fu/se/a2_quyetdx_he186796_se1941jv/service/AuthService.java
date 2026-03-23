package fu.se.a2_quyetdx_he186796_se1941jv.service;

import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.LoginRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.RegisterRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.AuthResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.SystemAccount;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.AppException;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.ErrorCode;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.SystemAccountRepository;
import fu.se.a2_quyetdx_he186796_se1941jv.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final SystemAccountRepository systemAccountRepository;

    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            SystemAccount account = systemAccountRepository.findByAccountEmail(request.getEmail())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            return AuthResponse.builder()
                    .token(jwt)
                    .accountId(account.getAccountId())
                    .accountName(account.getAccountName())
                    .accountEmail(account.getAccountEmail())
                    .accountRole(account.getAccountRole())
                    .build();
        } catch (BadCredentialsException e) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (systemAccountRepository.findByAccountEmail(request.getAccountEmail()).isPresent()) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        SystemAccount account = SystemAccount.builder()
                .accountName(request.getAccountName())
                .accountEmail(request.getAccountEmail())
                .accountPassword(request.getAccountPassword())
                .accountRole(2)
                .build();

        account = systemAccountRepository.save(account);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getAccountEmail(), request.getAccountPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return AuthResponse.builder()
                .token(jwt)
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .accountRole(account.getAccountRole())
                .build();
    }
}
