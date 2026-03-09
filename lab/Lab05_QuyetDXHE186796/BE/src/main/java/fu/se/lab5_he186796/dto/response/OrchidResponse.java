package fu.se.lab5_he186796.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrchidResponse {
    int orchidID;
    String orchidName;

    @JsonProperty("isNatural")
    boolean natural;

    String orchidDescription;
    String orchidCategory;

    @JsonProperty("isAttractive")
    boolean attractive;

    String orchidURL;
}
