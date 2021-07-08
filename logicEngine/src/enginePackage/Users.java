package enginePackage;

import javafx.util.Pair;

import javax.jws.soap.SOAPBinding;
import java.util.*;

public class Users
{
    /******************************************************************************/
    private Map<String, User> users;
    /******************************************************************************/
    public Users() { users = new HashMap<>(); }
    /******************************************************************************/
    public synchronized Collection<User> getUsers() { return this.users.values(); }
    /******************************************************************************/
    public synchronized Set<String> getUsersOnline()
    {
        Set<String> res = new HashSet<>();

        for(Map.Entry<String, User> e : users.entrySet())
            res.add("Name: " + e.getKey() + "\n" + "Role: " + e.getValue().getType().toString());

        return res;
    }
    /******************************************************************************/
    public void clearData() { users.clear(); }
    /******************************************************************************/
    public synchronized void addUser(String userName, User.Type type)
    {
        users.put(userName, new User(userName,type));
    }
    /******************************************************************************/
     public boolean isUserExist(String userName)
     {
         return users.containsKey(userName);
     }
    /******************************************************************************/
    public void addStock2User(String userName, String symbol, int amountOfStocks, int companyVal)
    {
        System.out.println(userName);
        User tmp = users.get(userName);
        if(tmp == null)
            System.out.println("user is null!");
        users.get(userName).getHoldings().add2Holdings(symbol, amountOfStocks, companyVal);
    }
    /******************************************************************************/
}
