package com.SystemyInformacyjne.TrainApplication.models;

import javax.persistence.*;

@Entity
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private long Id;

    private String train;
    private String stationStarting;
    private String stationFinal;
    private String dataStarting;
    private String timeStarting;
    private String dataFinal;
    private String timeFinal;
    private float prize;


    public Connection(){

    }

    public Connection(long id,String train, String stationStarting, String stationFinal, String dataStarting, String timeStarting, String dataFinal, String timeFinal, float prize) {
        this.Id=id;
        this.train = train;
        this.stationStarting = stationStarting;
        this.stationFinal = stationFinal;
        this.dataStarting = dataStarting;
        this.timeStarting = timeStarting;
        this.dataFinal = dataFinal;
        this.timeFinal = timeFinal;
        this.prize = prize;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getTimeFinal() {
        return timeFinal;
    }

    public void setTimeFinal(String timeFinal) {
        this.timeFinal = timeFinal;
    }

    public float getPrize() {
        return prize;
    }

    public void setPrize(float prize) {
        this.prize = prize;
    }


    public String getTrain() {
        return train;
    }

    public void setTrain(String train) {
        this.train = train;
    }

    public String getStationStarting() {
        return stationStarting;
    }

    public void setStationStarting(String stationStarting) {
        this.stationStarting = stationStarting;
    }

    public String getStationFinal() {
        return stationFinal;
    }

    public void setStationFinal(String stationFinal) {
        this.stationFinal = stationFinal;
    }

    public String getDataStarting() {
        return dataStarting;
    }

    public void setDataStarting(String dataStarting) {
        this.dataStarting = dataStarting;
    }

    public String getTimeStarting() {
        return timeStarting;
    }

    public void setTimeStarting(String timeStarting) {
        this.timeStarting = timeStarting;
    }

    public String getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(String dataFinal) {
        this.dataFinal = dataFinal;
    }

}
