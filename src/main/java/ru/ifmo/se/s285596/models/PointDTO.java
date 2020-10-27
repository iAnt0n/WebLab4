package ru.ifmo.se.s285596.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class PointDTO {
    @NotNull(message = "Please provide X")
    @Min(-5) @Max(5)
    private double x;

    @NotNull(message = "Please provide Y")
    @Min(-5) @Max(5)
    private double y;

    @NotNull(message = "Please provide R")
    @Min(-3) @Max(5)
    private double r;

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

}
