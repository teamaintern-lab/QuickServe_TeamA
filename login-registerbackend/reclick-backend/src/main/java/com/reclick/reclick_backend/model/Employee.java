package com.reclick.reclick_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empid")
    private Integer empId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "emp_email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "phone_no", nullable = false, length = 15)
    private String phoneNo;

    @Column(nullable = false, length = 255)
    private String address;

    // ✅ Constructors
    public Employee() {}

    public Employee(String name, String email, String passwordHash, String phoneNo, String address) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.phoneNo = phoneNo;
        this.address = address;
    }

    // ✅ Getters and setters
    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
