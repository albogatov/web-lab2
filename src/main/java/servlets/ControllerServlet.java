package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        if (req.getParameter("clean-indicator") != null && req.getParameter("clean-indicator").equals("true")) {
            getServletContext().getNamedDispatcher("ClearTableServlet").forward(req, res);
        } else if ((req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) ||
                req.getParameter("canvas-x") != null && req.getParameter("canvas-y") != null && req.getParameter("r") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, res);
        } else req.getRequestDispatcher("/index.jsp").forward(req, res);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        req.getRequestDispatcher("/index.jsp").forward(req, res);
    }
}
