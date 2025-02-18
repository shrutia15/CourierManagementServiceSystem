package com.courier.security;


import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JWTService {


    private SecretKey secretkey;

    public JWTService() {

        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            secretkey = keyGen.generateKey();
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    public String generateToken(Authentication authentication) {
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
		return Jwts.builder() 
				.setSubject((userPrincipal.getUsername())) 
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + 60*60*60*30))														
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("user_id",userPrincipal.getUser().getId())
				.signWith(secretkey) 
				.compact();
	}
private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
	String authorityString = authorities.stream().
			map(authority -> authority.getAuthority())
			.collect(Collectors.joining(","));
	System.out.println(authorityString);
	return authorityString;
}

	public Claims validateToken(String jwtToken) {
		
		Claims claims = Jwts.parserBuilder() 
				.setSigningKey(secretkey) 
				.build()
				.parseClaimsJws(jwtToken) 
				.getBody();
		return claims;		
	}

	public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		Claims payloadClaims = validateToken(jwt);
		String email = payloadClaims.getSubject();
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		Long userId= Long.valueOf((int)payloadClaims.get("user_id"));

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email,userId,authorities);
		System.out.println("is authenticated "+token.isAuthenticated());
		return token;
	}

	private List<GrantedAuthority> getAuthoritiesFromClaims(Claims payloadClaims) {
		String authString = (String) payloadClaims.get("authorities");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		authorities.forEach(System.out::println);
		return authorities;
	}




}