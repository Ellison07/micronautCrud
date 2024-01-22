package com.micronaut.repository;

import com.micronaut.entity.Employee;
import io.micronaut.context.annotation.Executable;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    @Executable
    Employee findByEmployeeId(String employeeId);
}