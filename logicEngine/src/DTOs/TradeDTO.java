package DTOs;

import java.util.ArrayList;
import java.util.List;

public class TradeDTO
{
    /******************************************************************************/
    private List<SubTrade> subTrades;
    private int inWaitingList;
    private int offerStockAmount;
    private String date;
    /******************************************************************************/
    public class SubTrade
    {
        private int amount;
        private int currPrice;
        private int totalWorth;
        private String buyer;
        private String seller;

        public SubTrade(int amount, int price, String seller, String buyer)
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
    public TradeDTO(int offerStockAmount)
    {
        subTrades = new ArrayList<>();
        offerStockAmount = inWaitingList = offerStockAmount;
    }
    /******************************************************************************/
    public List<SubTrade> getAllSubTrades() { return subTrades; }
    public int getOfferAmount() { return offerStockAmount; }
    public int getInWaitingList() { return inWaitingList; }
    /******************************************************************************/
    public void addSubTrade(int amount, int price, String seller, String buyer)
    {
        subTrades.add(new SubTrade(amount, price, seller, buyer));
        inWaitingList -= amount;
    }
    /******************************************************************************/


}
