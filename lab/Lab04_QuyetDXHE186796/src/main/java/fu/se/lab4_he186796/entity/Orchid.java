package fu.se.lab4_he186796.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orchid")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private int orchidID;

    @Column(name = "orchid_name")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "orchid_category")
    private String orchidCategory;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidURL;
}
