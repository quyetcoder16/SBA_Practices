package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "users")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "full_name", columnDefinition = "NVARCHAR(255)")
  private String fullName;

  @Column(unique = true, nullable = false)
  private String email;

  private String phone;

  @Column(name = "avatar_url")
  private String avatarUrl;

  private String status;

  @Column(name = "last_login_at")
  private LocalDateTime lastLoginAt;

  @OneToMany(mappedBy = "user")
  private Set<UserRole> userRoles;
}
