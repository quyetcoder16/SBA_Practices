package fu.se.a2_quyetdx_he186796_se1941jv.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SystemAccount {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "AccountID")
  private Integer accountId;

  @Column(name = "AccountName", length = 100)
  private String accountName;

  @Column(name = "AccountEmail", length = 70, unique = true)
  private String accountEmail;

  @Column(name = "AccountRole")
  private Integer accountRole;

  @Column(name = "AccountPassword", length = 70)
  private String accountPassword;
}
