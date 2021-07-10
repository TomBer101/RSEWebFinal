/******************************************************************************/
var refreshRate = 2000; // milli seconds
var ADMIN_UPDATE_DATA_SERVLET_URL = buildUrlWithContextPath("adminStockPageUpdateData");
/******************************************************************************/
function refreshStockData(stockData)
{
    $("#mainTitle").empty();
    $("#mainTitle").innerHTML = stockData.symbol + " Data:";

    $("#symbol").empty();
    $("#symbol").innerHTML = "Symbol: " + stockData.symbol;

    $("#companyName").empty();
    $("#companyName").innerHTML = "Company Name: " + stockData.companyName;

    $("#value").empty();
    $("#value").innerHTML = "Value: " + stockData.currValue;

    $("#cycle").empty();
    $("#cycle").innerHTML = "Cycle: " + stockData.transactionsCycle;

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

