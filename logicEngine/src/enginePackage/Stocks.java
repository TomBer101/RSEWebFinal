package enginePackage;

import java.util.*;

import DTOs.StockDTO;
import generated.*;

public class Stocks
{
    /******************************************************************************/
    private Map<String, Stock> stocks;
    /******************************************************************************/
    public Stocks() { stocks = new HashMap<>(); }
    /******************************************************************************/
    public synchronized Collection<Stock> getStocks() { return stocks.values(); }
    /******************************************************************************/
    public synchronized void loadData(RseStocks xmlStocks)
    {
        xmlStocks.getRseStock().forEach((s)->stocks.put(s.getRseSymbol(), new Stock(s)));
    }
    /******************************************************************************/
    public synchronized void clearData() { stocks.clear(); }
    /******************************************************************************/
    // This method will find a stock by its name (SYMBOL).
    // if there is no stock like this the method will return null!
    public synchronized Stock findStock(String symbol) { return stocks.get(symbol); }
    /******************************************************************************/
    public synchronized List<StockDTO> getOnlineStocks()
    {
        List<StockDTO> res = new ArrayList<>();
        stocks.forEach((k, s)-> res.add(new StockDTO(s)));
        return res;
    }
    /******************************************************************************/
    public synchronized boolean isStockExists(String symbol, String companyName)
    {
        if(stocks.containsKey(symbol))
            return true;

        for(Stock currStock : stocks.values())
        {
            if(currStock.getCompanyName().equals(companyName))
                return true;
        }

        return false;
    }
    /******************************************************************************/
    public synchronized void addStock(String symbol, String companyName, int amount, int companyValue)
    {
        stocks.put(symbol, new Stock(companyName, symbol, companyValue/amount));
    }
    /******************************************************************************/
}
