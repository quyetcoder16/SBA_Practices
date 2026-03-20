package fu.se.a2_quyetdx_he186796_se1941jv.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.keys.NewsArticleTagId;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "NewsTag")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsTag {
    @EmbeddedId
    private NewsArticleTagId id;

    @ManyToOne
    @MapsId("newsArticleId")
    @JoinColumn(name = "NewsArticleID")
    @JsonIgnore
    private NewsArticle newsArticle;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "TagID")
    private Tag tag;
}
