package fu.se.a2_quyetdx_he186796_se1941jv.security;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.SystemAccount;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.SystemAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final SystemAccountRepository systemAccountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SystemAccount account = systemAccountRepository.findByAccountEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        String roleName = account.getAccountRole() == 1 ? "ROLE_ADMIN" : "ROLE_STAFF";

        return new User(
                account.getAccountEmail(),
                account.getAccountPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}
