package fu.se.lab4_he186796.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrchidRequest {
    String orchidName;
    boolean isNatural;
    String orchidDescription;
    String orchidCategory;
    boolean isAttractive;
    String orchidURL;
}
