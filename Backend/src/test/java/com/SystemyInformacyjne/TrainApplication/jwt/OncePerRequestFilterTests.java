package com.SystemyInformacyjne.TrainApplication.jwt;

import com.itextpdf.io.exceptions.IOException;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
public class OncePerRequestFilterTests {
    private MockHttpServletRequest request;
    private MockHttpServletResponse response;
    private MockFilterChain chain;
    private OncePerRequestFilter filter;
    private HttpServlet servlet;


    private List<OncePerRequestFilter> invocations;

    @Before
    @SuppressWarnings("serial")
    public void setup() {
        this.servlet = new HttpServlet() {
        };
        this.request = new MockHttpServletRequest();
        this.response = new MockHttpServletResponse();
        this.chain = new MockFilterChain();
        this.invocations = new ArrayList<>();
        this.filter = new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request,
                                            HttpServletResponse response, FilterChain filterChain)
                    throws ServletException, IOException, java.io.IOException {
            }
        };
    }

    @Test
    public void doFilterOnce() throws ServletException, IOException, java.io.IOException {
        this.filter.doFilter(this.request, this.response, this.chain);

        assertThat(this.invocations).containsOnly(this.filter);
    }

    @Test
    public void doFilterMultiOnlyIvokesOnce() throws ServletException, IOException, java.io.IOException {
        this.filter.doFilter(this.request, this.response,
                new MockFilterChain(this.servlet, this.filter));

        assertThat(this.invocations).containsOnly(this.filter);
    }

    @Test
    public void doFilterOtherSubclassInvoked() throws ServletException, IOException, java.io.IOException {
        OncePerRequestFilter filter2 = new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request,
                                            HttpServletResponse response, FilterChain filterChain)
                    throws ServletException, IOException, java.io.IOException {
                OncePerRequestFilterTests.this.invocations.add(this);
                filterChain.doFilter(request, response);
            }
        };
        this.filter.doFilter(this.request, this.response,
                new MockFilterChain(this.servlet, filter2));

        assertThat(this.invocations).containsOnly(this.filter, filter2);
    }
}
