/******************************************************************************/
var refreshRate = 2000; // milli seconds
var ADMIN_UPDATE_DATA_SERVLET_URL = buildUrlWithContextPath("adminStockPageUpdateData");
/******************************************************************************/
function refreshStockData(stockData)
{
    $("#mainTitle").empty();
    $("#mainTitle").append(stockData.symbol + " Data:")

    $("#symbol").empty();
    $("#symbol").append("Symbol: " + stockData.symbol);

    $("#companyName").empty();
    $("#companyName").append("Company Name: " + stockData.companyName);

    $("#value").empty();
    $("#value").append("Value: " + stockData.currValue);

    $("#cycle").empty();
    $("#cycle").append("Cycle: " + stockData.transactionsCycle);

    var tableBodyElement = document.getElementById("transactionHistoryTb");

    if (tableBodyElement.length !== 1)
        $("#transactionHistoryTb").empty();

    stockData.transactionHistory.forEach( trade =>
    {
        var newRow = tableBodyElement.insertRow(-1);

        var dateCell = newRow.insertCell(0);
        var amountCell = newRow.insertCell(1);
        var valueCell = newRow.insertCell(2);

        dateCell.innerHTML = trade.date;
        amountCell.innerHTML = trade.amount;
        valueCell.innerHTML = trade.value;
    })
}
/******************************************************************************/
function ajaxAdminData()
{
    $.ajax({
        url: ADMIN_UPDATE_DATA_SERVLET_URL,
        success: function (stockData)
        {
            refreshStockData(stockData);
        }
    })
}
/******************************************************************************/
$(function()
{
    setInterval(ajaxAdminData, refreshRate);
});
/******************************************************************************/
// TODO : we need to add the commands from the waiting list.
