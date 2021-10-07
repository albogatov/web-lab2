package com.example.Lab2;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) {
        String x = req.getParameter("xvalue");
        String y = req.getParameter("yvalue");
        String r = req.getParameter("rvalue");

        boolean isValid = validateData(x, y, r);
        if  (isValid) {

        }
    }

    private boolean validateData(String x, String y, String r) {
        return validateX(x) && validateY(y) && validateR(r);
    }

    private boolean validateX(String x) {
        try {
            double numX = Double.parseDouble(x);
            if (numX >= -4 && numX <= 4)
                return true;
            else return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateY(String y) {
        try {
            double numY = Double.parseDouble(y);
            if (numY >= -3 && numY <= 3)
                return true;
            else return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateR(String r) {
        try {
            double numR = Double.parseDouble(r);
            if (numR >= 1 && numR <= 5)
                return true;
            else return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean checkFirstQuarter(double x, double y, double r) {
        return y >= 0 && x >= 0 && x <= r && Math.sqrt(x * x + y * y) <= r;
    }

    private boolean checkSecondQuarter(double x, double y, double r) {
        return y >= 0 && x <= 0 && Math.abs(x) <= r && x <= (r - y) && y <= r;
    }

    private boolean checkThirdQuarter(double x, double y, double r) {
        return y <= 0 && x <= 0 && Math.abs(x) <= r && Math.abs(y) <= r;
    }

    private boolean checkHit(double x, double y, double r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkThirdQuarter(x, y, r);
    }
}
