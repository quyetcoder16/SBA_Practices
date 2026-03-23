package fu.se.a2_quyetdx_he186796_se1941jv.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SystemAccountRequest {
    String accountName;
    String accountEmail;
    Integer accountRole;
    String accountPassword;
}
