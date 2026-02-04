package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "certificates")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Certificate extends BaseEntity {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @Column(name = "certificate_id")
  private Long certificateId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enrollment_id")
  private Enrollment enrollment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  private Course course;

  @Column(name = "certificate_no", unique = true)
  private String certificateNo;

  @Column(name = "template_id")
  private String templateId;

  @Column(name = "issued_at")
  private LocalDateTime issuedAt;

  @Column(name = "verification_code")
  private String verificationCode;

  @Column(name = "verification_url")
  private String verificationUrl;

  @Column(name = "revoked_at")
  private LocalDateTime revokedAt;
}
