/******************************************************************************/
var refreshRate = 2000;
var STOCK_DATA_SERVLET_URL = buildUrlWithContextPath("stockData4Broker");

/******************************************************************************/
function refreshBrokerData(data)
{
    $("#amount").empty();
    $("#amount").append(data.amount);

    $("#mainTitle").empty();
    $("#mainTitle").append(stockData.symbol + " Data:");

    $("#symbol").empty();
    $("#symbol").append("Symbol: " + stockData.symbol) ;

    $("#companyName").empty();
    $("#companyName").append( "Company Name: " + stockData.companyName);

    $("#value").empty();
    $("#value").append("Value: " + stockData.currValue);

    $("#cycle").empty();
    $("#cycle").append("Cycle: " + stockData.transactionsCycle);

    var tableBodyElement = $("#transactionHistoryTb");
    if (tableBodyElement.length !== 1)
        tableBodyElement.empty();

    data.stockDto.transactionHistory.forEach(trade =>
        {
            var newRow = tableBodyElement.insertRow(-1);

            var dateCll = newRow.insertCell(0);
            var amountCell = newRow.insertCell(1);
            var valueCell = newRow.insertCell(2);

            dateCell
        }
    )

}


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
