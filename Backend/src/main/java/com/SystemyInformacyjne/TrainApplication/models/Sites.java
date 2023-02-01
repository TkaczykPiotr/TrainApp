package com.SystemyInformacyjne.TrainApplication.models;

import javax.persistence.*;

@Entity
public class Sites {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int Id;
    private int conn;
    private boolean status;

    public Sites(){

    }

    public Sites(int id, int conn, boolean status) {
        Id = id;
        this.conn = conn;
        this.status = status;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }


    public int getConn() {
        return conn;
    }

    public void setConn(int conn) {
        this.conn = conn;
    }


}
