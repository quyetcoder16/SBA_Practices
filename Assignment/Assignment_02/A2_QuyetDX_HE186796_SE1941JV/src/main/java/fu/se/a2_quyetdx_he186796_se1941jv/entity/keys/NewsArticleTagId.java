package fu.se.a2_quyetdx_he186796_se1941jv.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class NewsArticleTagId implements Serializable {

    @Column(name = "NewsArticleID")
    private Integer newsArticleId;

    @Column(name = "TagID")
    private Integer tagId;
}