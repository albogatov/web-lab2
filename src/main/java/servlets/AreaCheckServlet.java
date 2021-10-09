package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;

import data.Result;

import java.util.ArrayList;
import java.util.Date;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        long begin = System.nanoTime();
        String xVal = req.getParameter("x");
        String yVal = req.getParameter("y").replace(",", ".");
        String rVal = req.getParameter("r");
        HttpSession session = req.getSession();


        boolean isValid = validateData(xVal, yVal, rVal);
        if (isValid) {
            double x = Double.parseDouble(xVal);
            double y = Double.parseDouble(yVal);
            double r = Double.parseDouble(rVal);
            boolean hit = checkHit(x, y, r);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
            Date date = new Date(System.currentTimeMillis());
            String currentTime = formatter.format(date);
            double executionTime = System.nanoTime() - begin;
            Result result = new Result(x, y, r, currentTime, executionTime, hit);
            ArrayList<Result> results;
            if (session.getAttribute("results") == null) {
                results = new ArrayList<>();
            } else {
                results = (ArrayList<Result>) session.getAttribute("results");
            }
            results.add(result);
        }
        req.getRequestDispatcher("/index.jsp").forward(req, res);
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
