/******************************************************************************/
var refreshRate = 2000; // milli seconds
var USER_LIST_SERVLET_URL = buildUrlWithContextPath("usersList");
var STOCK_LIST_SERVLET_URL = buildUrlWithContextPath("stocksList");
/******************************************************************************/
function refreshUsersList(users)
{
    $('#usersList').empty();

    $.each(users || [], function(index, user)
    {
        $('<li class="userOnline">' + user + '</li>')
            .appendTo($('#usersList'));
    });
}
/******************************************************************************/
function refreshStocksList(stocks)
{
    $('#stocksList').empty();

    $.each(stocks || [], function (index, stock)
    {
        $('<li id=' + stock.symbol + "  onclick='showStock(" + stock.symbol +")'>" + "Symbol: " + stock.symbol + "<br>" + "Company: " + stock.companyName + "<br> Value: "
            + stock.currValue + "<br> Cycle: " + stock. transactionsCycle + "</li>").appendTo($('#stocksList'));
    });
}
/******************************************************************************/
function showStock(symbol)
{
    $.ajax({
        data: "symbol=" + symbol.getAttribute('id'),
        url:"http://localhost:8080/webModule_Web_exploded/pages/adminHomePage/StockInfoServlet",
        method: "GET",
        timeout: 2000,
        error: function(errorMassage)
        {
            console.log(errorMassage);
        },
        success: function (nextPageUrl)
        {
            window.location.replace(nextPageUrl);
        }
    });

    // By default - we will always return false
    return false;
}
/******************************************************************************/
function ajaxUsersList()
{
    $.ajax({
        url: USER_LIST_SERVLET_URL,
        success: function(users)
        {
            refreshUsersList(users);
        }
    })
}
/******************************************************************************/
function ajaxStocksList()
{
    $.ajax({
        url: STOCK_LIST_SERVLET_URL,
        dataType: 'json',
        success: function(stocks)
        {
            refreshStocksList(stocks);
        }
    })
}
/******************************************************************************/
$(function()
{
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxStocksList, refreshRate);
});
/******************************************************************************/




