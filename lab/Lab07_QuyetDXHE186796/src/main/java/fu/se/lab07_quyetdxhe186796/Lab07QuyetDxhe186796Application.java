package fu.se.lab07_quyetdxhe186796;

import fu.se.lab07_quyetdxhe186796.pojo.Student;
import fu.se.lab07_quyetdxhe186796.service.IStudentService;
import fu.se.lab07_quyetdxhe186796.service.StudentService;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class Lab07QuyetDxhe186796Application {

  public static void main(String[] args) {

    IStudentService studentService = new StudentService();
    Scanner scanner = new Scanner(System.in);
    int choice = -1;

    while (choice != 0) {
      System.out.println("\n--- Student Management Menu ---");
      System.out.println("1. List all students");
      System.out.println("2. Add new student");
      System.out.println("3. Update student");
      System.out.println("4. Delete student");
      System.out.println("5. Find student by ID");
      System.out.println("6. Find student by Email");
      System.out.println("0. Exit");
      System.out.print("Enter your choice: ");

      try {
        choice = Integer.parseInt(scanner.nextLine());
      } catch (NumberFormatException e) {
        System.out.println("Invalid input. Please enter a number.");
        continue;
      }

      switch (choice) {
        case 1:
          List<Student> students = studentService.findAll();
          if (students != null && !students.isEmpty()) {
            students.forEach(System.out::println);
          } else {
            System.out.println("No students found.");
          }
          break;

        case 2:
          Student newStudent = new Student();
          System.out.print("Enter Email: ");
          newStudent.setEmail(scanner.nextLine());
          System.out.print("Enter Password: ");
          newStudent.setPassword(scanner.nextLine());
          System.out.print("Enter First Name: ");
          newStudent.setFirstName(scanner.nextLine());
          System.out.print("Enter Last Name: ");
          newStudent.setLastName(scanner.nextLine());
          System.out.print("Enter Marks: ");
          newStudent.setMarks(Integer.parseInt(scanner.nextLine()));
          studentService.save(newStudent);
          break;

        case 3:
          System.out.print("Enter Student ID to update: ");
          int updateId = Integer.parseInt(scanner.nextLine());
          Student existing = studentService.findById(updateId);
          if (existing != null) {
            System.out.print("Enter New Email (current: " + existing.getEmail() + "): ");
            existing.setEmail(scanner.nextLine());
            System.out.print("Enter New First Name (current: " + existing.getFirstName() + "): ");
            existing.setFirstName(scanner.nextLine());
            System.out.print("Enter New Marks (current: " + existing.getMarks() + "): ");
            existing.setMarks(Integer.parseInt(scanner.nextLine()));
            studentService.update(existing);
          } else {
            System.out.println("Student not found.");
          }
          break;

        case 4:
          System.out.print("Enter Student ID to delete: ");
          int deleteId = Integer.parseInt(scanner.nextLine());
          studentService.delete(deleteId);
          break;

        case 5:
          System.out.print("Enter Student ID: ");
          int findId = Integer.parseInt(scanner.nextLine());
          Student sById = studentService.findById(findId);
          if (sById != null) {
            System.out.println(sById);
          } else {
            System.out.println("Student not found.");
          }
          break;

        case 6:
          System.out.print("Enter Email: ");
          String email = scanner.nextLine();
          Student sByEmail = studentService.findByEmail(email);
          if (sByEmail != null) {
            System.out.println(sByEmail);
          } else {
            System.out.println("Student not found.");
          }
          break;

        case 0:
          System.out.println("Exiting...");
          break;

        default:
          System.out.println("Invalid choice.");
      }
    }
    scanner.close();
    System.exit(0);
  }
}
