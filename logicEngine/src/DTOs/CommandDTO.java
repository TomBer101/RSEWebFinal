package DTOs;

import java.util.ArrayList;
import java.util.List;

public class CommandDTO
{
    /******************************************************************************/
    private List<SubCommandTrade> subCommandTrades;
    private int inWaitingList;
    private int offerStockAmount;
    private String date;
    /******************************************************************************/
    public class SubCommandTrade
    {
        private int amount;
        private int currPrice;
        private int totalWorth;
        private String buyer;
        private String seller;

        public SubCommandTrade(int amount, int price, String seller, String buyer)
        {
            this.amount = amount;
            this.currPrice = price;
            this.seller = seller;
            this.buyer = buyer;
        }

        public int getAmount() { return amount; }
        public double getPrice() { return currPrice; }
        public String getUserSoldName() { return seller; }
        public String getUserBoughtName(){ return buyer; }
    }
    /******************************************************************************/
    public CommandDTO(int offerStockAmount)
    {
        subCommandTrades = new ArrayList<>();
        offerStockAmount = inWaitingList = offerStockAmount;
    }
    /******************************************************************************/
    public List<SubCommandTrade> getAllSubTrades() { return subCommandTrades; }
    public int getOfferAmount() { return offerStockAmount; }
    public int getInWaitingList() { return inWaitingList; }
    /******************************************************************************/
    public void addSubTrade(int amount, int price, String seller, String buyer)
    {
        subCommandTrades.add(new SubCommandTrade(amount, price, seller, buyer));
        inWaitingList -= amount;
    }
    /******************************************************************************/


}
