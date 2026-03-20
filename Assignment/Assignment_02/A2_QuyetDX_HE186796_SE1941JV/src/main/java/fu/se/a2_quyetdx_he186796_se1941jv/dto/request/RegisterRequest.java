package fu.se.a2_quyetdx_he186796_se1941jv.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    String accountName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    String accountEmail;

    @NotBlank(message = "Password is required")
    String accountPassword;
}
