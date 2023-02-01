package com.SystemyInformacyjne.TrainApplication.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SocialController {

    @GetMapping("/")
    public String helloWorld() {
        return "hello word";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public void method(HttpServletResponse httpServletResponse) {
        httpServletResponse.setHeader("Location", "http://localhost:3000/user");
       httpServletResponse.setStatus(302);
    }
}
