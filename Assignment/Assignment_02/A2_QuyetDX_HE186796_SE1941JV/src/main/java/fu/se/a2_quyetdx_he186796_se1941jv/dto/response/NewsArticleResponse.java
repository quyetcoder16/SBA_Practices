package fu.se.a2_quyetdx_he186796_se1941jv.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsArticleResponse {
    Integer newsArticleId;
    String newsTitle;
    String headline;
    LocalDateTime createdDate;
    String newsContent;
    String newsSource;
    Boolean newsStatus;
    LocalDateTime modifiedDate;
    Integer categoryId;
    String categoryName;
    Integer createdById;
    String createdByName;
    List<TagResponse> tags;
}
