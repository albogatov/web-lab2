package filter;

import data.Result;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExecFilter implements Filter {
    @Override
    public void init(FilterConfig fConfig) throws ServletException {
//        System.out.println("Filter init!");
    }

    @Override
    public void destroy() {
//        System.out.println("Filter destroy!");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long begin = System.nanoTime();
//        System.out.println("FILTERING");
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpSession session = request.getSession();
        filterChain.doFilter(servletRequest, servletResponse);
        List<Result> results = (ArrayList) session.getAttribute("results");
        if((results != null) && session.getAttribute("validity").equals("true")) {
            double end = (System.nanoTime() - begin) * Math.pow(10, -9);
            Result result = results.get(results.size() - 1);
            result.setExecutionTime(end);
            results.set(results.size() - 1, result);
            session.setAttribute("results", results);
            session.setAttribute("validity", "false");
        }
//        System.out.println("FILTERED");
    }
}
