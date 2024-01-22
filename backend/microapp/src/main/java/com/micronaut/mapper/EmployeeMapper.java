package com.micronaut.mapper;
import com.micronaut.dto.EmployeeDTO;
import com.micronaut.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDTO toEmployeeDTO(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());
        employeeDTO.setEmployeeName(employee.getEmployeeName());
        employeeDTO.setEmployeeId(employee.getEmployeeId());
        employeeDTO.setEmployeeEmail(employee.getEmployeeEmail());
        return employeeDTO;
    }

    public static Employee toEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setEmployeeName(employeeDTO.getEmployeeName());
        employee.setEmployeeId(employeeDTO.getEmployeeId());
        employee.setEmployeeEmail(employeeDTO.getEmployeeEmail());
        return employee;
    }
}
