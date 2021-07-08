package servlets;

import com.google.gson.Gson;
import enginePackage.Users;
import javafx.util.Pair;
import utils.ServletsUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Set;

public class UsersListServlet extends HttpServlet
{
    /******************************************************************************/
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException
    {
        response.setContentType("application/json");

        try (PrintWriter out = response.getWriter())
        {
            Gson gson = new Gson();
            Users users = ServletsUtils.getUsers(getServletContext());
            Set<String> usersList = users.getUsersOnline();
            String json = gson.toJson(usersList);
            out.println(json);
            out.flush();
        }
    }
    /******************************************************************************/
}