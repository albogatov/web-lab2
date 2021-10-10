package data;

public class Result {
    private final double x;
    private final double y;
    private final double r;
    private final String currTime;
    private final double executionTime;
    private final boolean hit;

    public Result(double x, double y, double r, String currTime, double executionTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currTime = currTime;
        this.executionTime = executionTime;
        this.hit = hit;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCurrTime() {
        return currTime;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public boolean getHit() {
        return hit;
    }
}
