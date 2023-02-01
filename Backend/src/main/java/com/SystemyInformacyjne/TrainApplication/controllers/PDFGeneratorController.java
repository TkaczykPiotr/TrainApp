package com.SystemyInformacyjne.TrainApplication.controllers;

import com.SystemyInformacyjne.TrainApplication.security.services.PDFGeneratorService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/ticket")
public class PDFGeneratorController {

    private final PDFGeneratorService pdfGeneratorService;


    public PDFGeneratorController(PDFGeneratorService pdfGeneratorService) {
        this.pdfGeneratorService = pdfGeneratorService;

    }



    @GetMapping("/generate/{id}/{idT}/{idP}")
    public void generatePDF(HttpServletResponse response, @PathVariable Long id, @PathVariable Long idT, @PathVariable Long idP) throws IOException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=ticket_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);

        this.pdfGeneratorService.export(response, id, idT, idP);
    }


}