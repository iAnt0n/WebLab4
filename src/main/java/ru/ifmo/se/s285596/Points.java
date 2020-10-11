package ru.ifmo.se.s285596;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Points {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double x;
    private double y;
    private double r;
    private boolean result;
    private LocalDateTime reqTime;

    @ManyToOne
    private User user;

    public Points(){}

    public void calculate() {
        result = ((x<=0 && y>=0) && y<=x+r)
                || ((x>=0 && y>=0) && x*x+y*y<=r*r)
                || ((x>=0 && y<=0) && x<=r/2 && y<=-r);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public LocalDateTime getReqTime() {
        return reqTime;
    }

    public void setReqTime(LocalDateTime reqTime) {
        this.reqTime = reqTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

