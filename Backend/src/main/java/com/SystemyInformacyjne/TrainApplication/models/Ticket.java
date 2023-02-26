package com.SystemyInformacyjne.TrainApplication.models;

import com.SystemyInformacyjne.TrainApplication.models.Payment;
import com.SystemyInformacyjne.TrainApplication.models.Reduction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private int connection;
    @NotBlank
    private int account;
    @NotBlank
    private int payments;
    @NotBlank
    private float reduction;
    @NotBlank
    private String userName;
    @NotBlank
    private String userSurname;

    @NotBlank
    private String dates;
    @NotBlank
    private int site;
    @NotBlank
    private float prize;

    public Ticket(){

    }

    public Ticket(Long id, int connection, int account, int payments, float reduction, String userName, String userSurname, String dates, int site) {
        this.id = id;
        this.connection = connection;
        this.account = account;
        this.payments = payments;
        this.reduction = reduction;
        this.userName = userName;
        this.userSurname = userSurname;
        this.dates = dates;
        this.site = site;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getConnection() {
        return connection;
    }

    public float getPrize() {
        return prize;
    }

    public void setPrize(float prize) {
        this.prize = prize;
    }

    public void setConnection(int connection) {
        this.connection = connection;
    }

    public int getAccount() {
        return account;
    }

    public void setAccount(int account) {
        this.account = account;
    }

    public int getPayments() {
        return payments;
    }

    public void setPayments(int payments) {
        this.payments = payments;
    }

    public float getReduction() {
        return reduction;
    }

    public void setReduction(float reduction) {
        this.reduction = reduction;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserSurname() {
        return userSurname;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public String getDates() {
        return dates;
    }

    public void setDates(String dates) {
        this.dates = dates;
    }

    public int getSite() {
        return site;
    }

    public void setSite(int site) {
        this.site = site;
    }
}
