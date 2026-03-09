package fu.se.lab5_he186796.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrchidRequest {
    String orchidName;

    @JsonProperty("isNatural")
    boolean natural;

    String orchidDescription;
    String orchidCategory;

    @JsonProperty("isAttractive")
    boolean attractive;

    String orchidURL;
}
