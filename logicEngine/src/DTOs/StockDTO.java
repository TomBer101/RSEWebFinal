package DTOs;

import enginePackage.Stock;
import enginePackage.Trade;

import java.util.ArrayList;
import java.util.List;

public class StockDTO
{
    /******************************************************************************/
    private String companyName;
    private String symbol;
    private int currValue;
    private int transactionsCycle;
    private List<TradeDTO> transactionHistory;
    /******************************************************************************/
    public StockDTO(Stock stock)
    {
        this.companyName = stock.getCompanyName();
        this.symbol = stock.getSymbol();
        this.currValue = stock.getCurrValue();
        this.transactionsCycle = stock.getTransactionsCycle();

        this.transactionHistory = new ArrayList<>();

        stock.getTransactionsHistory().forEach((t)-> {
            this.transactionHistory.add(new TradeDTO(t));
        });
    }
    /******************************************************************************/
    public String getCompanyName() { return companyName; }
    public String getSymbol() { return symbol; }
    public int getCurrValue() { return currValue; }
    public int getTransactionsCycle() { return transactionsCycle; }
    public List<TradeDTO> getTransactionHistory() { return transactionHistory; }
    /******************************************************************************/
}
