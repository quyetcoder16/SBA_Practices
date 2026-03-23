package fu.se.a2_quyetdx_he186796_se1941jv.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsArticleRequest {
    String newsTitle;
    String headline;
    String newsContent;
    String newsSource;
    Boolean newsStatus;
    Integer categoryId;
    List<Integer> tagIds;
}
