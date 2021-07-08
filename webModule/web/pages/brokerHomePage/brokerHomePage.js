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
       $('<li id=' + stock.symbol + ">" + "Symbol: " + stock.symbol + "<br>" + "Company: " + stock.companyName + "<br> Value: "
           + stock.currValue + "<br> Cycle: " + stock.transactionCycle + "</li>").appendTo($('#stocksList'));
    });
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
function revelForm ()  {
    //$("#issueStockHolder").hidden = false;
    var x = document.getElementById("issueStockHolder");
    x.style.displey = 'block';
}
/******************************************************************************/
$(function(){
    $("#issueStockForm").submit(function(){

        var symbol = document.getElementById("symbol");
        var companyName = document.getElementById("companyName");
        var stockAmount = document.getElementById("stocksAmount");
        var companyVal = document.getElementById("companyValue");

        if(symbol.value.length === 0 || companyVal.value.length === 0 ||
            companyName.value.length === 0 || stockAmount.value.length === 0)
            $('error-holder').append("Missing Information");
        // Check we got integers where is needed. TODO
        if(stockAmount.value == 0)
            $('error-holder').append("Amount of stocks should be grater then zero");

        else{
            $.ajax({
                data:$(this).serialize(),
                url:this.action,
                timeout:2000,
                error: function(errorObject)
                {
                    console.error("Failed to add Stock!");
                    $("#error-holder").append(errorObject.responseText);
                },
                success:function(r)
                {
                    $('#issueStockHolder').hidden = true;
                }
            });
            return false;

        }
    });
    });
/******************************************************************************/
function cancelForm()
{
    $('#issueStockHolder').hidden = true;
}
/******************************************************************************/
//$(function()
//{
   // $("#issueStockHolder").style.display = 'block';

//})
