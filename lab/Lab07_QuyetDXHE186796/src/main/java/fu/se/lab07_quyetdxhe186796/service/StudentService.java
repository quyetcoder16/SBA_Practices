package fu.se.lab07_quyetdxhe186796.service;

import fu.se.lab07_quyetdxhe186796.pojo.Student;
import fu.se.lab07_quyetdxhe186796.repository.IStudentRepository;
import fu.se.lab07_quyetdxhe186796.repository.StudentRepository;

import java.util.List;

public class StudentService implements IStudentService {
  private IStudentRepository iStudentRepository = null;

  public StudentService() {
    this.iStudentRepository = new StudentRepository();
  }

  public StudentService(IStudentRepository iStudentRepository) {
    this.iStudentRepository = iStudentRepository;
  }

  @Override
  public List<Student> findAll() {
    return iStudentRepository.findAll();
  }

  @Override
  public void save(Student student) {
    iStudentRepository.save(student);
  }

  @Override
  public void delete(int studentId) {
    iStudentRepository.delete(studentId);
  }

  @Override
  public Student findById(int studentId) {
    return iStudentRepository.findById(studentId);
  }

  @Override
  public void update(Student student) {
    iStudentRepository.update(student);
  }

  @Override
  public Student findByEmail(String email) {
    return iStudentRepository.findByEmail(email);
  }
}
