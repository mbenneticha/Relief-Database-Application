/*Function for AJAX requests*/
function AJAX(method, link, data, callback){
    var req = new XMLHttpRequest();
    req.open(method, link, true);
    if (method === 'POST')
        req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            callback(req.responseText);
        }
        else{
            console.log("Error: " + req.statusText);
        }
    });
    req.send(data);
} 



function makeTable(data){
    var table = document.getElementById('tableRows');
    table.innerHTML = "";
    var tableData = JSON.parse(data);

    tableData.forEach(function(r){
        var row = document.createElement('tr');

        Object.keys(r).forEach(function(c){
          
            if (c =='name'){
                var cell = document.createElement('td');
                cell.setAttribute("id", "product-" + r.name);
                cell.setAttribute("class", "col-md-8");
                cell.textContent = r[c];
                row.appendChild(cell); 

            }

            else if (c == 'product_qty'){
            var editCell = document.createElement('td');
            editCell.setAttribute("class", "col-md-3");
            var editField = document.createElement('span');
            
            editField.innerHTML = "<div>" +
            "<input type='text' class='form-control' id='item-" + r.name +"' placeholder=" + r[c] +" ></div>";
            editCell.appendChild(editField);
            editCell.setAttribute("style", "float: right;");
            row.appendChild(editCell);
            }
        }); 

            var updateCell = document.createElement('td');
            var updateButton = document.createElement('input');
            updateButton.setAttribute("type", "submit");
            updateButton.setAttribute("class", "btn btn-warning btn-block");
            updateButton.setAttribute("style", "float: right;");
            updateButton.setAttribute("value", "Update");
            updateCell.appendChild(updateButton);
            updateRow(updateButton, r.id, r.name);
            row.appendChild(updateCell);

            /*appends row to the table*/
            table.appendChild(row);
    });
}


function updateRow(btn, id, name){
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();

    var data = {};
    //data.cart_id = 1;

    data.product_id = id;


    data.product_qty = document.getElementById("item-" + name).value;

    data = JSON.stringify(data);
    
    AJAX('POST', '/update-cart', data, function(response){
        makeTable(response);
    });

    window.location.reload();
});
}


function addIndiaWater(qty){

    var data = {};
    data.action = 'insert-water';
    //data.cart_id = 1;
    data.product_id = 1;
    data.product_qty = qty;

        data = JSON.stringify(data);

        AJAX('POST', '/update-cart', data, function(response){
            
        });

        window.location.reload();

}



function addItem(qty, product){
    var data = {};

    data.product_id = product;
    data.product_qty = qty;

        data = JSON.stringify(data);

        AJAX('POST', '/update-cart', data, function(response){
            
        });
}
