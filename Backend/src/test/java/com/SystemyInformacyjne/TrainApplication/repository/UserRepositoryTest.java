package com.SystemyInformacyjne.TrainApplication.repository;

import com.SystemyInformacyjne.TrainApplication.models.ERole;
import com.SystemyInformacyjne.TrainApplication.models.Role;
import com.SystemyInformacyjne.TrainApplication.models.User;
import com.SystemyInformacyjne.TrainApplication.payload.request.SignupRequest;
import com.SystemyInformacyjne.TrainApplication.security.oauth.Provider;
import com.SystemyInformacyjne.TrainApplication.service.BaseTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest extends BaseTest {
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {

    }
    @Test
    void shouldSaveUser() {
        User user = new User("user2", "mail2@mail.com", "password");
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(ERole.ROLE_USER));
        user.setRoles(roles);
        user.setProvider(Provider.LOCAL);
        User savedUser = userRepository.save(user);
        assertThat(savedUser).usingRecursiveComparison().ignoringFields("userId").isEqualTo(user);

    }

    @Test
    void shouldRegisterUserAndThenBlockDuplicateUsername() {
         SignupRequest signUpRequest = new SignupRequest();
         signUpRequest.setUsername("userRegister");
         signUpRequest.setPassword("password");
         signUpRequest.setEmail("mymailregister@mail.com");
         Set<String> role = new HashSet<>();
         role.add("0");
         signUpRequest.setRole(role);

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            fail("Username exists");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            fail("Email exists");
        }
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword());
        Set<Role> roles = new HashSet<>();
        Role userRole = new Role(ERole.ROLE_USER);
        roles.add(userRole);

        user.setRoles(roles);
        user.setProvider(Provider.LOCAL);
        assertThat(userRepository.save(user)).usingRecursiveComparison().ignoringFields("userId").isEqualTo(user);

        signUpRequest = new SignupRequest();
        signUpRequest.setUsername("userRegister");
        signUpRequest.setPassword("password");
        signUpRequest.setEmail("mymailregister2@mail.com");
        role.add("0");
        signUpRequest.setRole(role);

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            fail("Email exists");
        }
        User nuser = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword());

        roles.add(userRole);

        user.setRoles(roles);
        user.setProvider(Provider.LOCAL);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userRepository.save(nuser);
        });
        String expectedMessage = "could not execute statement";
        System.out.println(exception.getMessage());
        assertTrue(exception.getMessage().contains(expectedMessage));
    }
}