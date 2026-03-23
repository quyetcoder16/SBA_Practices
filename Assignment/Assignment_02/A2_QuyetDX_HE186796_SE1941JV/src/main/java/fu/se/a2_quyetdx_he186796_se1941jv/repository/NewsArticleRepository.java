package fu.se.a2_quyetdx_he186796_se1941jv.repository;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.NewsArticle;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    List<NewsArticle> findByNewsStatusTrue();
    List<NewsArticle> findByCreatedByAccountId(Integer accountId);

    @Query("SELECT COUNT(na) FROM NewsArticle na WHERE na.createdBy.accountId = :accountId")
    long countByCreatedByAccountId(Integer accountId);
}
