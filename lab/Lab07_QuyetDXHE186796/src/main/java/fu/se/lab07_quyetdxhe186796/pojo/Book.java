package fu.se.lab07_quyetdxhe186796.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "title", length = 30)
  private String title;

  private String author;

  private String isbn;

  @ManyToOne
  @JoinColumn(name = "student_id")
  private Student student;
}
