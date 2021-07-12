/******************************************************************************/
var refreshRate = 2000;
var STOCK_DATA_SERVLET_URL = buildUrlWithContextPath("stockData4Broker");

/******************************************************************************/
function updateStockChart(chartData)
{
    $("#stockChartHolder").empty();
    //chartData = chartData.reverse();

    var chart = new CanvasJS.Chart("stockChartHolder",{
        animationEnabled: true,
        animationDuration: 2000,
        title: { text:"Stock Price History"},
        axisX: { title: "Time"},
        axisY: { title: "Price"},
        data: [{
            type: "line",
            dataPoints: chartData
        }]
    });
    chart.render();
}
/******************************************************************************/
function refreshBrokerData(stockData)
{
    var myAmount = stockData.amount;
    var currStockDTO = stockData.stockDTO;

    $("#mainTitle").empty();
    $("#mainTitle").append(currStockDTO.symbol + " Data:");

    $("#symbol").empty();
    $("#symbol").append("Symbol: " + currStockDTO.symbol);

    $("#companyName").empty();
    $("#companyName").append( "Company Name: " + currStockDTO.companyName);

    $("#value").empty();
    $("#value").append("Value: " + currStockDTO.currValue);

    $("#cycle").empty();
    $("#cycle").append("Cycle: " + currStockDTO.transactionsCycle);

    $("#amount").empty();
    $("#amount").append(myAmount);

    if( myAmount === 0)
        $("#sRadio").prop('disabled', true);
    else
        $("#sRadio").prop('disabled', false);


    var tableBodyElement = document.getElementById("transactionHistoryTb");
    if (tableBodyElement.length !== 1)
        $("#transactionHistoryTb").empty();

    var dataForChart = [];
    var index = 0 ;
    currStockDTO.transactionHistory.forEach(trade =>
        {
            var newRow = tableBodyElement.insertRow(-1);

            var dateCell = newRow.insertCell(0);
            var amountCell = newRow.insertCell(1);
            var valueCell = newRow.insertCell(2);

            dateCell.innerHTML = trade.date;
            amountCell.innerHTML = trade.amount;
            valueCell.innerHTML = trade.value;

            dataForChart.push({x:index, y:parseInt(trade.value)});
            index++;
        }
    )

    updateStockChart(dataForChart);
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
        },
        error:function(e)
        {
            console.log("didnt refresh stock data.")
        }

    })
}
/******************************************************************************/
$(function ()
{
    ajaxRefreshBrokerData();
    setInterval(ajaxRefreshBrokerData, refreshRate);
});
/******************************************************************************/
function appendTrades(currTrades, way, stockSymbol)
{
    var otherSide = (way === "BUY" )? "seller" : "buyer" ; // suppose to be th same
    $('#currTrades').empty();

    var others = [];

    currTrades.subCommandTrades.forEach( trade =>
        {
            $('<li class="subTrade">' + trade.amount + "Stocks with " + trade[otherSide] +
                ". with value of: " + trade.currPrice + '</li>').appendTo($("#currTrades"));

            //others.push(trade[otherSide]);
        });

    //ajaxPushTradeNotafication(others, currTrades);

}
/******************************************************************************/
function appendMessage(currTrades, way, stockSymbol)
{
    var leftOvers = parseInt(currTrades.offerStockAmount) - parseInt(currTrades.inWaitingList);

    switch(leftOvers)
    {
        case parseInt(0):
            $("#msg-holder").append("Sorry. No trade had been made.");
            break;
        case(parseInt(currTrades.offerStockAmount)):
            $("#msg-holder").append("YAY! All the command is finished!")
            appendTrades(currTrades, way, stockSymbol);
            break;
        default:
            $("#msg-holder").append(msg.inWaitingList + " stocks are waiting. ")
            appendTrades(currTrades, way, stockSymbol);
            breake;
    }
}
/******************************************************************************/
$(function(){
    var formHolder = document.getElementById("makeCommandHolder");
    var currTradesList = document.getElementById("commandRes");

    $("#makeCommandForm").submit(function()
        {
            var myAmount = parseInt(document.getElementById("amount").innerText);
            var stockSymbol = document.getElementById("symbol");

            $("#msg-holder").empty();
            $("#currTrades").empty();
            //currTradesList.style.display = "none";

            var way = document.getElementsByName('way');
            var flag1 = false;
            for(var i = 0; i < way.length; i++){ // if way was selected
                if(way[i].checked){
                    flag1 = true;
                    way = way[i].value;
                    break;
                }
            }

            var type = document.getElementsByName('type');
            var flag2 = false
            for(var i = 0; i < type.length; i++){
                if(type[i].checked){
                    flag2 = true;
                    break;
                }
            }

            if(!flag1 || !flag2)
                $("#msg-holder").append("Missing information.");

            else if(document.getElementById("stockAmount").value.length == 0 || document.getElementById("stockAmount").value <= 0)
                $("#msg-holder").append("Amount of stock has to be greater then 0.");
            else if(document.getElementById("priceLimit").disabled === false && parseInt(document.getElementById("priceLimit").value) <= 0)
                $("#msg-holder").append("Price limit has to be greater then 0.");
            else if(way === "SELL" && document.getElementById("stockAmount").value > myAmount)
                $("#msg-holder").append("You cannot sell more than you have...");

            else
            {
                $.ajax({
                    data:$(this).serialize(),
                    url:this.action,
                    method: "POST",
                    timeout: 2000,
                    success:function(currTrades)
                    {
                        console.log("in sucsses");
                        appendMessage(currTrades, way, stockSymbol); // I send the way to print the opposite User.

                        $("#makeCommandForm")[0].reset();
                        formHolder.style.display = "none";
                        currTradesList.style.display = "block";
                    },
                    error:function(t)
                    {
                        console.log("bad");
                    }
                });
                return false;
            }
            return false;
        });
    return false;
});
/******************************************************************************/
function disableLimit()
{
    document.getElementById("priceLimit").disabled =  true;
}
/******************************************************************************/
function enableLimit()
{
    document.getElementById("priceLimit").disabled =  false;
}
/******************************************************************************/

