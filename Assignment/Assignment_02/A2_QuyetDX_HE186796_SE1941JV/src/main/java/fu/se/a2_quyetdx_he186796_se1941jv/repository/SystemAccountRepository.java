package fu.se.a2_quyetdx_he186796_se1941jv.repository;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {
    Optional<SystemAccount> findByAccountEmail(String accountEmail);
}
