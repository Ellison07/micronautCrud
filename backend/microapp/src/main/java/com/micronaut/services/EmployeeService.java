package com.micronaut.services;
import com.micronaut.dto.EmployeeDTO;

public interface EmployeeService {

    Iterable<EmployeeDTO> getAllEmployees();

    EmployeeDTO getEmployeeById(String employeeId);

    EmployeeDTO saveOrUpdateEmployee(EmployeeDTO employeeDTO);

    void deleteEmployee(Long employeeId);
}
