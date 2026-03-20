package fu.se.a2_quyetdx_he186796_se1941jv.repository;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.NewsTag;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.keys.NewsArticleTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsTagRepository extends JpaRepository<NewsTag, NewsArticleTagId> {
    List<NewsTag> findByNewsArticleNewsArticleId(Integer articleId);
    void deleteByNewsArticleNewsArticleId(Integer articleId);
}
