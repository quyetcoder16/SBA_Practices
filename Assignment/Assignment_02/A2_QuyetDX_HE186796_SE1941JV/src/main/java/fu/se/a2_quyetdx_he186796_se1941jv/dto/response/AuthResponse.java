package fu.se.a2_quyetdx_he186796_se1941jv.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    String token;
    Integer accountId;
    String accountName;
    String accountEmail;
    Integer accountRole;
}
