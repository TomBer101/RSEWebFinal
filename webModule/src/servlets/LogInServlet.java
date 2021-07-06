package servlets;

import enginePackage.Users;
import utils.ServletsUtils;
import utils.SessionUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LogInServlet extends HttpServlet
{
    /******************************************************************************/
    private final String SIGN_UP_URL = "../signUp/signUp.html";
    private final String RSE_HOME_PAGE_URL =  "../homePage/homePage.html";
    /******************************************************************************/
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        response.setContentType("text/html;charset=UTF-8");
        String userNameFromSession = SessionUtils.getUsername(request);
        Users users = ServletsUtils.getUsers(getServletContext());
        PrintWriter out = response.getWriter();

        String userNameFromParameter = request.getParameter("username");    // gets what the user typed
        if (userNameFromParameter == null || userNameFromParameter.isEmpty())   // input is empty (error)
        {
            out.println("<script type=\"text/javascript\">");
            out.println("alert('Missing information!');");
            out.println("</script>");
        }
        else    // input is valid (not empty)
        {
            if (userNameFromSession == null)    // user need to sign up (no session exist)
            {
                out.println("<script type=\"text/javascript\">");
                out.println("alert('You need to register to the system');");
                out.println("</script>");
                response.sendRedirect(SIGN_UP_URL);
            }
            else    // session exist
                response.sendRedirect(RSE_HOME_PAGE_URL);
        }

    }
    /******************************************************************************/
}
