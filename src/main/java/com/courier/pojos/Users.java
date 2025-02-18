package com.courier.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false,length = 50)
	private String firstName;
	@Column(nullable = false,length = 50)
	private String lastName;
	@Column(nullable = false,unique = true,length = 50)
	private String email;
	@Column(nullable = false)
	@JsonIgnore
	private String password;
	@OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
	private Address address;
	@Column(nullable = false)
	private String contactNumber;
	@Enumerated(EnumType.STRING)
	private Role role;

}
