
package com.SystemyInformacyjne.TrainApplication.security;

import com.SystemyInformacyjne.TrainApplication.security.jwt.AuthEntryPointJwt;
import com.SystemyInformacyjne.TrainApplication.security.jwt.AuthTokenFilter;
import com.SystemyInformacyjne.TrainApplication.security.oauth.CustomOAuth2User;
import com.SystemyInformacyjne.TrainApplication.security.oauth.CustomOAuth2UserService;
import com.SystemyInformacyjne.TrainApplication.security.oauth.UserService;
import com.SystemyInformacyjne.TrainApplication.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    @Autowired
    private CustomOAuth2UserService auth2UserService;
    @Autowired
    private UserService userService;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .cors().and().csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/apis/**").hasRole("USER").and()
//                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//                .authorizeRequests()
//                .antMatchers("/apis").permitAll().and()
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/api/auth/**", "/api/test/**","/api/connection/**", "/api/payment/**", "/api/ticket/**", "/api/site/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(auth2UserService)
                .and()
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                        Authentication authentication) throws IOException, ServletException {

                        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

                        ResponseEntity<?> entity= userService.processOAuthPostLogin(oauthUser, authentication);
                       // userService.processOAuthPostLogin(oauthUser);

                        System.out.println(entity.getBody());
                        response.sendRedirect("/home");

                    }
                });
                    //.userInfoEndpoint()
                    //.userService(auth2UserService);
//                    .authorizationEndpoint()
//                    .baseUri("/apis/oauth2/authorization")
//                    .and()
//                    .redirectionEndpoint()
//                    .baseUri("/apis/home/*");



//                .cors().and().csrf().disable()
//                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//                .authorizeRequests()
//                .antMatchers("/api/auth/**")
//                .permitAll()
//                .antMatchers("/api/test/**").permitAll()
//                .antMatchers("/api/connection/**").permitAll()
//                .anyRequest().authenticated();


        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }



}