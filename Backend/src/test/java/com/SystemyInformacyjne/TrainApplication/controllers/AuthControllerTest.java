
package com.SystemyInformacyjne.TrainApplication.controllers;

import com.SystemyInformacyjne.TrainApplication.models.ERole;
import com.SystemyInformacyjne.TrainApplication.models.Role;
import com.SystemyInformacyjne.TrainApplication.models.User;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import com.SystemyInformacyjne.TrainApplication.payload.request.LoginRequest;
import com.SystemyInformacyjne.TrainApplication.payload.request.SignupRequest;
import com.SystemyInformacyjne.TrainApplication.repository.UserRepository;
import com.SystemyInformacyjne.TrainApplication.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import java.util.HashSet;
import java.util.Set;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.context.ActiveProfiles;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    AuthController auth;
    private ObjectMapper mapper = new ObjectMapper();
   /* @Test
    void executingFinders() throws Exception {

       LoginRequest login = new LoginRequest();
       login.setPassword("password");
       login.setUsername("username");
       String json = mapper.writeValueAsString(login);
        mockMvc.perform(post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }*/
    @Test
    void authenticateUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("Janek");
        loginRequest.setPassword("secret");
        String json = mapper.writeValueAsString(loginRequest);

        ResultActions result = mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk());
       // System.out.println(result.toString());
   /*     mockMvc.perform(MockMvcRequestBuilders.delete("/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());*/

    }
    @Test
    void testRegisterUser() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("Ala");
        signupRequest.setPassword("alamakota");
        signupRequest.setEmail("ala@mail.com");
        Set<String> strRoles = new HashSet<String>();
        strRoles.add("ROLE_USER");
        signupRequest.setRole(strRoles);
        String json = mapper.writeValueAsString(signupRequest);

        //Mockito.when(userRepository.save(user));
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

}
