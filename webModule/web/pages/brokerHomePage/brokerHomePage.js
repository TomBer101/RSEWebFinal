/******************************************************************************/
var refreshRate = 2000; // milli seconds
var USER_LIST_SERVLET_URL = buildUrlWithContextPath("usersList");
var STOCK_LIST_SERVLET_URL = buildUrlWithContextPath("stocksList");
var USER_DATA_SERVLET_URL = buildUrlWithContextPath("userData");
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
function refreshUserData(userData)
{
    $("#currentCurrency").empty();
    $("#currentCurrency").append(userData.currency);


    var tableBodyElement = document.getElementById("userHistoryTb");

    if (tableBodyElement.length !== 1)
        $("#userHistoryTb").empty();

    userData.actionHistory.forEach( action =>
    {
        var newRow =  tableBodyElement.insertRow(-1);

        var typeCell = newRow.insertCell(0);
        var dateCell = newRow.insertCell(1);
        var amountCell = newRow.insertCell(2);
        var currencyBeforeCell = newRow.insertCell(3);
        var currencyAfterCell = newRow.insertCell(4);
        var symbolCell = newRow.insertCell(5);

        typeCell.innerHTML = action.type;
        dateCell.innerHTML = action.date;
        amountCell.innerHTML = action.amount;
        currencyBeforeCell.innerHTML = action.currencyBefore;
        currencyAfterCell.innerHTML = action.currencyAfter;
        symbolCell.innerHTML = action.symbol;
    })
}
/******************************************************************************/
function showStock(symbol)
{
    $.ajax({
        data: "symbol=" + symbol.getAttribute('id'),
        url:"StockInfoServlet",
        method: "GET",
        timeout: 2000,
        error: function()
        {
            console.error("Should not have reach here");
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
function ajaxUserData()
{
    $.ajax({
        url: USER_DATA_SERVLET_URL,
        success: function(data)
        {
            refreshUserData(data);
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
    setInterval(ajaxUserData, refreshRate);
});
/******************************************************************************/
$(function(){
    var d = document.getElementById("issueStockHolder");
    $("#issueStockForm").submit(function()
    {
       // $("#error-holder").clear();
        var symbol = document.getElementById("symbol");
        var companyName = document.getElementById("companyName");
        var stockAmount = document.getElementById("stocksAmount");
        var companyVal = document.getElementById("companyValue");

        if(symbol.value.length === 0 || companyVal.value.length === 0 ||
            companyName.value.length === 0 || stockAmount.value.length === 0)
            $('error-holder').append("Missing Information");

        if(stockAmount.value == 0)
            $('error-holder').append("Amount of stocks should be grater then zero");
        else
        {

            $.ajax({
                data:$(this).serialize(),
                url:this.action,
                timeout:2000,
                error: function(errorObject)
                {
                    console.error("Failed to add Stock!");
                    $("#error-holder").append(errorObject.responseText);
                },
                success: function(r)
                {
                    $("#issueStockForm")[0].reset();
                   d.style.display = "none";
                }
            });
            return false;
        }
    });
});
/******************************************************************************/
$(function() {
    $("#chargeMoney").submit(function()
    {
      //  $('#error-holder').clear();
        var moneyAmount = document.getElementById("moneyAmount");

        if(moneyAmount.value.length === 0)
            $('error-holder').append("Missing Information"); // TODO : more informative message?
        else
        {
            $.ajax({
                data: $(this).serialize(),
                url: this.action,
                timeout: 2000,
                error: function(errorObject)
                {
                    console.error("Failed to load Money!");
                    $("#error-holder").append(errorObject.responseText);
                },
                success: function(r)
                {
                    $('#chargeMoney')[0].reset();
                }
            });
            return false;
        }
        return false;
    });
});
/******************************************************************************/
var refreshRate = 2000;
/******************************************************************************/
$(function()
{
    $('#uploadFileForm').submit(function()
    {
        var file2Load = this[0].files[0];
        var type = file2Load.type; // type of the file

        if (type !== 'text/xml')
            $('#error-holder').append("File must be .xml !");
        else
        {
            var formData = new FormData();
            formData.append("myFile", file2Load);

            $.ajax({
                method: 'POST',
                data: formData,
                url: this.action,
                processData: false,
                contentType: false,
                timeout: 4000,
                error: function(e)
                {
                    console.error("Failed to get result from server");
                    $("#error-holder").text("Failed to get result from server:\n" + e);
                },
                success: function(r)
                {
                    $('#error-holder').text(r);
                }
            });
            return false;
        }
        return false;
    });
    return false;
});
/******************************************************************************/
