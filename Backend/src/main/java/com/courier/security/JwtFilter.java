package com.courier.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private JWTService jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader=request.getHeader("Authorization");
		//2. Check if its not null n starts with - Bearer
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			//3. extract JWT
			String jwt=authHeader.substring(7);
			//4. Simply invoke JWT utils 's method for JWT validation n getting 
			//Authentication object.
			Authentication authentication = jwtService.populateAuthenticationTokenFromJWT(jwt);
			//5. upon successful verification , store auth object under spring sec ctx holder
			SecurityContextHolder.getContext().setAuthentication(authentication);
			System.out.println("saved auth details under spring sec ctx!!!!");
		}
		//continue with remaining filter chain.
		filterChain.doFilter(request, response);

	}

}
