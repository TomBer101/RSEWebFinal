package DTOs;

import enginePackage.Stock;

public class StockDTO
{
    /******************************************************************************/
    private String companyName;
    private String symbol;
    private int currValue;
    private int transactionsCycle;
    /******************************************************************************/
    public StockDTO(Stock stock)
    {
        this.companyName = stock.getCompanyName();
        this.symbol = stock.getSymbol();
        this.currValue = stock.getCurrValue();
        this.transactionsCycle = stock.getTransactionsCycle();
    }
    /******************************************************************************/
    public String getCompanyName() { return companyName; }
    public String getSymbol() { return symbol; }
    public int getCurrValue() { return currValue; }
    public int getTransactionsCycle() { return transactionsCycle; }
    /******************************************************************************/
}
