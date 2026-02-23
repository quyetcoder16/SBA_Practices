package se.fu.lab3_he186796.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private String empId;
    private String name;
    private String designation;
    private double salary;
}
