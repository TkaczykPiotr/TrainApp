package com.SystemyInformacyjne.TrainApplication.security.oauth;

import com.SystemyInformacyjne.TrainApplication.models.User;
import com.SystemyInformacyjne.TrainApplication.payload.request.LoginRequest;
import com.SystemyInformacyjne.TrainApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.SystemyInformacyjne.TrainApplication.models.ERole;
import com.SystemyInformacyjne.TrainApplication.models.Role;
import com.SystemyInformacyjne.TrainApplication.models.User;
import com.SystemyInformacyjne.TrainApplication.payload.response.JwtResponse;
import com.SystemyInformacyjne.TrainApplication.payload.response.MessageResponse;
import com.SystemyInformacyjne.TrainApplication.repository.RoleRepository;
import com.SystemyInformacyjne.TrainApplication.repository.UserRepository;
import com.SystemyInformacyjne.TrainApplication.security.jwt.JwtUtils;
import com.SystemyInformacyjne.TrainApplication.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtils jwtUtils;
    public ResponseEntity<?>  processOAuthPostLogin(CustomOAuth2User usr, Authentication authentication) {

    System.out.println("yoyoyo");


        if (!userRepository.existsByUsername(usr.getName()) && !userRepository.existsByEmail(usr.getEmail())) {
            User newUser = new User();
            newUser.setUsername("jasio");
            newUser.setProvider(Provider.GOOGLE);
            newUser.setEmail(usr.getEmail());
            newUser.setPassword("");

            Set<Role> roles = new HashSet<>();

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            newUser.setRoles(roles);

            System.out.println(usr.getName());
            userRepository.save(newUser);

        }
        return authenticateGoogleUser(usr,authentication);

    }
    public ResponseEntity<?> authenticateGoogleUser(CustomOAuth2User usr, Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(usr);
        List<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");
        return ResponseEntity.ok(new JwtResponse(jwt,
                10L,
                usr.getName(),
                usr.getEmail(),
                roles));
    }

}