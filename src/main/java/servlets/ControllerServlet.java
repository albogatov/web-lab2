package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        System.out.println("Entered Post" + req.getParameter("x") + req.getParameter("y") + req.getParameter("r"));
        if (req.getParameter("clean-indicator") != null && req.getParameter("clean-indicator").equals("true")) {
            System.out.println("Forwarding to clearing");
            getServletContext().getNamedDispatcher("ClearTableServlet").forward(req, res);
        } else if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) {
            System.out.println("Forwarding to checking");
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, res);
        } else req.getRequestDispatcher("/index.jsp").forward(req, res);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        req.getRequestDispatcher("/index.jsp").forward(req, res);
    }
}
