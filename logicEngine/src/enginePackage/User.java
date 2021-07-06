package enginePackage;

public class User
{
    /******************************************************************************/
    public enum Type {ADMIN, TRADER}
    /******************************************************************************/
    private String name;
    private UserHoldings holdings;
    private Type type;
    /******************************************************************************/
    public User(String name, Type type)
    {
        if (type == Type.TRADER)
            holdings = new UserHoldings();
        this.name = name;
        this.type = type;
    }
    /******************************************************************************/
    public String getName() { return name; }
    public UserHoldings getHoldings() { return holdings; }
    public Type getType() { return type; }
    /******************************************************************************/
    public void updateHoldings(int stockAmount, Command.Way way, Stock stock)
    {
        holdings.updateHoldings(stock.getSymbol(), stockAmount, stock.getCurrValue(), way);
    }
    /******************************************************************************/

}
