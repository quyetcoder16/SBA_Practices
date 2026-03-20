package fu.se.a2_quyetdx_he186796_se1941jv.service;

import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.NewsArticleRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.NewsArticleResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.TagResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.*;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.keys.NewsArticleTagId;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.AppException;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.ErrorCode;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsArticleService {

    private final NewsArticleRepository newsArticleRepository;
    private final CategoryRepository categoryRepository;
    private final SystemAccountRepository systemAccountRepository;
    private final TagRepository tagRepository;
    private final NewsTagRepository newsTagRepository;

    private SystemAccount getCurrentAccount() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return systemAccountRepository.findByAccountEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    private NewsArticleResponse toResponse(NewsArticle article) {
        List<TagResponse> tags = article.getNewsTags() == null ? new ArrayList<>() :
                article.getNewsTags().stream()
                        .map(nt -> TagResponse.builder()
                                .tagId(nt.getTag().getTagId())
                                .tagName(nt.getTag().getTagName())
                                .note(nt.getTag().getNote())
                                .build())
                        .collect(Collectors.toList());

        return NewsArticleResponse.builder()
                .newsArticleId(article.getNewsArticleId())
                .newsTitle(article.getNewsTitle())
                .headline(article.getHeadline())
                .createdDate(article.getCreatedDate())
                .newsContent(article.getNewsContent())
                .newsSource(article.getNewsSource())
                .newsStatus(article.getNewsStatus())
                .modifiedDate(article.getModifiedDate())
                .categoryId(article.getCategory() != null ? article.getCategory().getCategoryId() : null)
                .categoryName(article.getCategory() != null ? article.getCategory().getCategoryName() : null)
                .createdById(article.getCreatedBy() != null ? article.getCreatedBy().getAccountId() : null)
                .createdByName(article.getCreatedBy() != null ? article.getCreatedBy().getAccountName() : null)
                .tags(tags)
                .build();
    }

    @Transactional(readOnly = true)
    public List<NewsArticleResponse> getAll() {
        return newsArticleRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NewsArticleResponse> getAllActive() {
        return newsArticleRepository.findByNewsStatusTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NewsArticleResponse> getMyArticles() {
        SystemAccount account = getCurrentAccount();
        return newsArticleRepository.findByCreatedByAccountId(account.getAccountId()).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NewsArticleResponse getById(Integer id) {
        return toResponse(newsArticleRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_ARTICLE_NOT_FOUND)));
    }

    @Transactional
    public NewsArticleResponse create(NewsArticleRequest request) {
        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        SystemAccount author = getCurrentAccount();

        NewsArticle article = NewsArticle.builder()
                .newsTitle(request.getNewsTitle())
                .headline(request.getHeadline())
                .newsContent(request.getNewsContent())
                .newsSource(request.getNewsSource())
                .newsStatus(request.getNewsStatus() != null ? request.getNewsStatus() : true)
                .category(category)
                .createdBy(author)
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .build();

        NewsArticle saved = newsArticleRepository.save(article);
        saveTags(saved, request.getTagIds());

        return toResponse(newsArticleRepository.findById(saved.getNewsArticleId()).orElseThrow());
    }

    @Transactional
    public NewsArticleResponse update(Integer id, NewsArticleRequest request) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_ARTICLE_NOT_FOUND));

        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setNewsStatus(request.getNewsStatus());
        article.setModifiedDate(LocalDateTime.now());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            article.setCategory(category);
        }

        NewsArticle saved = newsArticleRepository.save(article);
        newsTagRepository.deleteByNewsArticleNewsArticleId(saved.getNewsArticleId());
        saveTags(saved, request.getTagIds());

        return toResponse(newsArticleRepository.findById(saved.getNewsArticleId()).orElseThrow());
    }

    @Transactional
    public void delete(Integer id) {
        if (!newsArticleRepository.existsById(id)) {
            throw new AppException(ErrorCode.NEWS_ARTICLE_NOT_FOUND);
        }
        newsArticleRepository.deleteById(id);
    }

    private void saveTags(NewsArticle article, List<Integer> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) return;
        Set<NewsTag> newsTags = new HashSet<>();
        for (Integer tagId : tagIds) {
            Tag tag = tagRepository.findById(tagId)
                    .orElseThrow(() -> new AppException(ErrorCode.TAG_NOT_FOUND));
            NewsTag newsTag = new NewsTag();
            newsTag.setId(new NewsArticleTagId(article.getNewsArticleId(), tag.getTagId()));
            newsTag.setNewsArticle(article);
            newsTag.setTag(tag);
            newsTags.add(newsTag);
        }
        newsTagRepository.saveAll(newsTags);
    }
}
