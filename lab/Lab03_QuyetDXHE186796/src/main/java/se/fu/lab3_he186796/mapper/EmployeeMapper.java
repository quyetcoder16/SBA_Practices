package se.fu.lab3_he186796.mapper;

import org.mapstruct.Mapper;
import se.fu.lab3_he186796.dto.EmployeeDto;
import se.fu.lab3_he186796.pojos.Employee;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    EmployeeDto mapToEmployeeDto(Employee employee);

    Employee mapToEmployee(EmployeeDto employeeDto);
}
