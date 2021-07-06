package enginePackage;

import javax.jws.soap.SOAPBinding;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class Users
{
    /******************************************************************************/
    private Map<String, User> users;
    /******************************************************************************/
    public Users() { users = new HashMap<>(); }
    /******************************************************************************/
    public synchronized Collection<User> getUsers() { return this.users.values(); }
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
}
