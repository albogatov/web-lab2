package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;

import data.Result;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
//        long begin = System.nanoTime();
//        System.out.println("BEGIN CHECK");
        String xVal;
        String yVal;
        String rVal;
        if (req.getParameter("canvas-x").equals("") || req.getParameter("canvas-y").equals("")) {
            xVal = req.getParameter("x");
            yVal = req.getParameter("y").replace(",", ".");
            rVal = req.getParameter("r");
        } else {
            xVal = req.getParameter("canvas-x");
            yVal = req.getParameter("canvas-y").replace(",", ".");
            rVal = req.getParameter("r");
        }

        HttpSession session = req.getSession();

        session.setAttribute("validity", "false");
        boolean isValid = validateData(xVal, yVal, rVal);
        if (isValid) {
            double x = Double.parseDouble(xVal);
            double y = Double.parseDouble(yVal);
            double r = Double.parseDouble(rVal);
            boolean hit = checkHit(x, y, r);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
            Date date = new Date(System.currentTimeMillis());
            String currentTime = formatter.format(date);
//            long executionTime = System.nanoTime() - begin;
            long executionTime = 0;
            Result result = new Result(Math.round(x * 100) / 100D, Math.round(y * 100) / 100D, r, currentTime, executionTime * Math.pow(10, -9), hit);
            List<Result> results;
            if (session.getAttribute("results") == null) {
                results = new ArrayList<>();
            } else {
                results = (ArrayList<Result>) session.getAttribute("results");
            }
            results.add(result);
            session.setAttribute("results", results);
            session.setAttribute("validity", "true");
        }
//        System.out.println("END CHECK");
        res.sendRedirect("/Lab2-1.0-SNAPSHOT");
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
        return y >= 0 && x <= 0 && Math.abs(x) <= r && y <= (x + r) && y <= r;
    }

    private boolean checkThirdQuarter(double x, double y, double r) {
        return y <= 0 && x <= 0 && Math.abs(x) <= r && Math.abs(y) <= r;
    }

    private boolean checkHit(double x, double y, double r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkThirdQuarter(x, y, r);
    }
}
