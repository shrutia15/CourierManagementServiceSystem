package com.courier.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.courier.pojos.Users;
import com.courier.repository.UserRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user= userRepository.findByEmail(email);
		if(user==null) {
			System.out.println(user);
			throw new UsernameNotFoundException("User not found");
		}
		return new UserPrinciple(user);
	}

}
