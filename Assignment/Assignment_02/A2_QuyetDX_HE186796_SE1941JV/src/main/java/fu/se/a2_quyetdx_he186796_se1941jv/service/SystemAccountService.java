package fu.se.a2_quyetdx_he186796_se1941jv.service;

import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.SystemAccountRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.SystemAccountResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.SystemAccount;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.AppException;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.ErrorCode;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.NewsArticleRepository;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.SystemAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SystemAccountService {

    private final SystemAccountRepository systemAccountRepository;
    private final NewsArticleRepository newsArticleRepository;

    private SystemAccountResponse toResponse(SystemAccount account) {
        return SystemAccountResponse.builder()
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .accountRole(account.getAccountRole())
                .build();
    }

    @Transactional(readOnly = true)
    public List<SystemAccountResponse> getAll() {
        return systemAccountRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SystemAccountResponse getById(Integer id) {
        return toResponse(systemAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    @Transactional
    public SystemAccountResponse create(SystemAccountRequest request) {
        if (systemAccountRepository.findByAccountEmail(request.getAccountEmail()).isPresent()) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        SystemAccount account = SystemAccount.builder()
                .accountName(request.getAccountName())
                .accountEmail(request.getAccountEmail())
                .accountRole(request.getAccountRole() != null ? request.getAccountRole() : 2)
                .accountPassword(request.getAccountPassword())
                .build();
        return toResponse(systemAccountRepository.save(account));
    }

    @Transactional
    public SystemAccountResponse update(Integer id, SystemAccountRequest request) {
        SystemAccount account = systemAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        if (request.getAccountPassword() != null && !request.getAccountPassword().isBlank()) {
            account.setAccountPassword(request.getAccountPassword());
        }

        return toResponse(systemAccountRepository.save(account));
    }

    @Transactional
    public void delete(Integer id) {

        SystemAccount account = systemAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (newsArticleRepository.countByCreatedByAccountId(account.getAccountId()) > 0) {
            throw new AppException(ErrorCode.USER_HAS_ARTICLE);
        }

        if (!systemAccountRepository.existsById(id)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        systemAccountRepository.deleteById(id);
    }
}
