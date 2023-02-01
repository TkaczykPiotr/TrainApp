package com.SystemyInformacyjne.TrainApplication.security.services;

import com.SystemyInformacyjne.TrainApplication.models.Connection;
import com.SystemyInformacyjne.TrainApplication.models.Payment;
import com.SystemyInformacyjne.TrainApplication.models.Ticket;
import com.SystemyInformacyjne.TrainApplication.repository.ConnectionRepository;
import com.SystemyInformacyjne.TrainApplication.repository.PaymentRepository;
import com.SystemyInformacyjne.TrainApplication.repository.TicketRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Service
public class PDFGeneratorService {

    private ConnectionRepository connectionRepository;
    private TicketRepository ticketRepository;
    private PaymentRepository paymentRepository;

    public PDFGeneratorService(ConnectionRepository connectionRepository, TicketRepository ticketRepository, PaymentRepository paymentRepository) {
        this.connectionRepository = connectionRepository;
        this.ticketRepository = ticketRepository;
        this.paymentRepository = paymentRepository;
    }


    public void export(HttpServletResponse response, Long id, Long idT, Long idP) throws IOException {




        Optional<Connection> connection = connectionRepository.findById(id);
        Optional<Ticket> ticket = ticketRepository.findById(idT);
        Optional<Payment> payment = paymentRepository.findById(idP);


        PdfWriter writer=new PdfWriter(response.getOutputStream());


        PdfDocument pdfdoc=new PdfDocument(writer);
        pdfdoc.addNewPage();

        Document document=new Document(pdfdoc);
        String para1 = "Ticket on Train";
        String paraN = "Name: " +  ticket.orElse(null).getUserName();
        String paraS = "Surname: "  + ticket.orElse(null).getUserSurname() ;
        String para2 = "From: " +  connection.orElse(null).getStationStarting();
        String para3 = "To: "  +  connection.orElse(null).getStationFinal() ;
        String para4 = "Date Starting: " +  connection.orElse(null).getDataStarting() ;
        String para5 = "Date Final: " + connection.orElse(null).getDataFinal() ;
        String para6 = "Time Starting: " +  connection.orElse(null).getTimeStarting() ;
        String para7 = "Time Final: " +  connection.orElse(null).getTimeFinal();
        String para8 = "Train: " +  connection.orElse(null).getTrain();
        String para9 = "Prize: " +  ticket.orElse(null).getPrize();
        String para10 = "Reduction: " +  (1-ticket.orElse(null).getReduction())*100 + "%";
        String para11 = "Status: " +  payment.orElse(null).getStatus();
        String para12 = "Method: " +  payment.orElse(null).getName();



        // Creating Paragraphs
        Paragraph paragraph1 = new Paragraph(para1);
        Paragraph paragraph2 = new Paragraph(para2);
        Paragraph paragraph3 = new Paragraph(para3);
        Paragraph paragraph4 = new Paragraph(para4);
        Paragraph paragraph5 = new Paragraph(para5);
        Paragraph paragraph6 = new Paragraph(para6);
        Paragraph paragraph7 = new Paragraph(para7);
        Paragraph paragraph8 = new Paragraph(para8);
        Paragraph paragraphN = new Paragraph(paraN);
        Paragraph paragraphS = new Paragraph(paraS);
        Paragraph paragraph9 = new Paragraph(para9);
        Paragraph paragraph10 = new Paragraph(para10);
        Paragraph paragraph11 = new Paragraph(para11);
        Paragraph paragraph12 = new Paragraph(para12);

        // Adding paragraphs to document
        document.add(paragraphN);
        document.add(paragraphS);
        document.add(paragraph1);
        document.add(paragraph2);
        document.add(paragraph3);
        document.add(paragraph4);
        document.add(paragraph5);
        document.add(paragraph6);
        document.add(paragraph7);
        document.add(paragraph8);
        document.add(paragraph9);
        document.add(paragraph10);
        document.add(paragraph11);
        document.add(paragraph12);
        document.close();


       


    }
}