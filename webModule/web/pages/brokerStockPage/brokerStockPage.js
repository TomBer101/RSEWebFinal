/******************************************************************************/
var refreshRate = 2000;
var STOCK_DATA_SERVLET_URL = buildUrlWithContextPath("stockData4Broker");

/******************************************************************************/
function refreshBrokerData(stockData)
{
    $("#mainTitle").empty().append(stockData.symbol + " Data:");
    //$("#mainTitle");

    $("#symbol").empty().append("Symbol: " + stockData.symbol);
    //$("#symbol") ;

    $("#companyName").empty().append( "Company Name: " + stockData.companyName);
    //$("#companyName").;

    $("#value").empty().append("Value: " + stockData.currValue);
    //$("#value");

    $("#cycle").empty().append("Cycle: " + stockData.transactionsCycle);
    //$("#cycle");

    $("#amount").empty().append(stockData.amount);
    //$("#amount");

    if( stockData.amount == 0)
        $("#sRadio").disabled = true;
    else
        $("#sRadio").disabled = false;


    var tableBodyElement = $("#transactionHistoryTb");
    if (tableBodyElement.length !== 1)
        tableBodyElement.empty();

    stockData.stockDto.transactionHistory.forEach(trade =>
        {
            var newRow = tableBodyElement.insertRow(-1);

            var dateCell = newRow.insertCell(0);
            var amountCell = newRow.insertCell(1);
            var valueCell = newRow.insertCell(2);

            dateCell.innerHTML = trade.date;
            amountCell.innerHTML = trade.amount;
            valueCell.innerHTML = trade.value;
        }
    )

}
/******************************************************************************/
function ajaxRefreshBrokerData(){
    $.ajax({
        url:STOCK_DATA_SERVLET_URL,
        method:"GET",
        success:function(data)
        {
            console.log("In Success Stock DATA");
            refreshBrokerData(data);
        }
    })
}
/******************************************************************************/
$(function ()
{
    setInterval(ajaxRefreshBrokerData, refreshRate);
});
/******************************************************************************/
function appendTrades(currTrades, way)
{
    var otherSide = (way === "BUY" )? "seller" : "buyer" ; // suppose to be th same
    $('#currTrades').empty();

    currTrades.subCommandTrades.forEach( trade =>
        {
            $('<li id=subTrade>' + trade.amount + "Stocks with " + trade[otherSide] +
                ". with value of: " + trade.currPrice + '</li>').appendTo($("#currTrades"));
        });
}
/******************************************************************************/
function appendMessage(currTrades, way)
{
    var leftOvers = parseInt(msg.offerStockAmount) - parseInt(msg.inWaitingList);

    switch(leftOvers)
    {
        case parseInt(msg.offerStockAmount):
            $("#msg-holder").append("Sorry. No trade had been made.");
            break;
        case(0):
            $("#msg-holder").append("YAY! All the command is finished!")
            appendTrades(currTrades, way);
            break;
        default:
            $("#msg-holder").append(msg.inWaitingList + " stocks are waiting. ")
            appendTrades(currTrades, way);
            breake;
    }
}
/******************************************************************************/
$(function(){
    var formHolder = document.getElementById("makeCommandHolder");
    var currTradesList = document.getElementById("currTrades");

    $("#makeCommandForm").submit(function()
        {
            $("#msg-holder").empty();
            currTradesList.style.display = "none";
            currTradesList.empty();

            var way = document.getElementsByName('way');
            var flag1 = false;
            for(var i = 0; i < radios.length; i++){
                if(way[i].checked){
                    flag1 = true;
                    way = way[i].value();
                    break;
                }
            }

            var type = document.getElementsByName('type');
            var flag2 = false
            for(var i = 0; i < radios.length; i++){
                if(type[i].checked){
                    flag2 = true;
                    break;
                }
            }

            if(!flag1 || !flag2)
                $("#msg-holder").append("Missing information.")

            else if(document.getElementById("stockAmount") <= 0)
                $("#msg-holder").append("Amount of stock has to be greater then 0.")
            else if(document.getElementById("priceLimit").disabled === true && parseInt(document.getElementById("priceLimit")) <= 0)
                $("#msg-holder").append("Price limit has to be greater then 0.")

            else
            {
                $.ajax({
                    data:$(this).serialize(),
                    url:this.action,
                    timeout: 2000,
                    success:function(currTrades)
                    {
                        appendMessage(currTrades, way); // I send the way to print the opposite User.
                        $("makeCommandForm")[0].reset();
                        formHolder.style.display = "none";
                        currTradesList.style.display = "block";
                    }
                });
            }
        }
    )
});
/******************************************************************************/
function toggleLimit()
{
    document.getElementById("priceLimit").disabled =  !(document.getElementById("priceLimit").disabled);
}
/******************************************************************************/

