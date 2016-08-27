var express = require('express');
var mysql = require('./dataBase.js');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
/*needed for post request */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.use(express.static(__dirname + '/public'));


/*routes for web pages*/
app.get('/',function(req,res){
  res.render('home');
});


app.get('/india',function(req,res){
  res.render('india');
}); 


app.get('/india-water',function(req,res){
  res.render('india-water');
});

app.get('/india-firstaid',function(req,res){
  res.render('india-firstaid');
});

app.get('/india-action',function(req,res){
  res.render('india-action');
});


app.get('/congo',function(req,res){
  res.render('congo');
}); 

app.get('/congo-water',function(req,res){
  res.render('congo-water');
});

app.get('/congo-firstaid',function(req,res){
  res.render('congo-firstaid');
});

app.get('/congo-action',function(req,res){
  res.render('congo-action');
});


app.get('/about',function(req,res){
  res.render('about');
}); 


app.get('/cart',function(req,res){
  res.render('cart');
});


app.get('/checkout',function(req,res){
  res.render('checkout');
});

/*app.get('/confirm',function(req,res){
  res.render('confirm');
});
*/

global.cartID = 0;



app.post('/add-item', function(req, res, next){
  
    mysql.pool.query("INSERT INTO cart_contents (`cart_id`, `product_id`, `product_qty`)" +
      " VALUES (?, ?, ?)", 
      [cartID, req.body.product_id, req.body.product_qty],
      function(err, result){
        if(err){
          next(err); 
          return;

        }

      });
});



app.post('/india-firstaid', function(req, res, next){
  
  if (req.body.action === 'insert-firstaid'){

    mysql.pool.query("INSERT INTO cart_contents (`cart_id`, `product_id`, `product_qty`)" +
      " VALUES (?, ?, ?)", 
      [cartID, req.body.product_id, req.body.product_qty],
      function(err, result){
        if(err){
          next(err); 
          return;
          
        }
        
      });
  }
});   


app.post('/congo-water', function(req, res, next){
  
  if (req.body.action === 'insert-water'){

    mysql.pool.query("INSERT INTO cart_contents (`cart_id`, `product_id`, `product_qty`)" +
      " VALUES (?, ?, ?)", 
      [cartID, req.body.product_id, req.body.product_qty],
      function(err, result){
        if(err){
          next(err); 
          return;
          
        }
        
      });
  }
}); 


app.post('/congo-firstaid', function(req, res, next){
  
  if (req.body.action === 'insert-firstaid'){

    mysql.pool.query("INSERT INTO cart_contents (`cart_id`, `product_id`, `product_qty`)" +
      " VALUES (?, ?, ?)", 
      [cartID, req.body.product_id, req.body.product_qty],
      function(err, result){
        if(err){
          next(err); 
          return;
          
        }
        
      });
  }
}); 


/*changes current cart information*/
app.post('/update-cart', function(req, res, next){
    cid = cartID;
    pid = req.body.product_id;
    qty = req.body.product_qty;


    mysql.pool.query("CALL update_cart(?,?,?);", 
    [cartID, pid, qty],
      function(err, result){
        if(err){
          next(err); 
          return;
        }
    });
});
  


app.get('/confirm', function(req, res, next){

    context = {};
    
    context.confirmation = [];

    var id = global.cartID;


    mysql.pool.query("SELECT DISTINCT location_id FROM (cart_contents INNER JOIN product ON product.id=cart_contents.product_id) WHERE cart_id=?;", [id],
      function(err, rows, fields){
    if (err){
      next(err);
      return;
    }

    for (var row in rows){
      mysql.pool.query("INSERT INTO shipment (cart_id, location_id) VALUES (?,?)", [id, rows[row].location_id],
        function(err, result){
        
        if(err){
          next(err); 
          return;
        }
        });
  }

  
});


    mysql.pool.query("INSERT INTO cart VALUES ()",
      function(err, result){
        if(err){
          next(err);
          return;
        }
        global.cartID = result.insertId;
      });

     res.render('confirm');


});



/*receives current cart information*/
app.get('/getCart', function(req, res, next){

  var id = global.cartID;

  mysql.pool.query('SELECT product.name, cart_contents.product_qty, product.id FROM cart_contents INNER JOIN product ON cart_contents.product_id=product.id WHERE cart_contents.cart_id=?', [id],
   function(err, rows, fields){
    if (err){
      next(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});


/*gets the total price of the cart*/
app.get('/getTotal', function(req, res, next){

  var id = global.cartID;

  mysql.pool.query('SELECT SUM(price) FROM cart_contents INNER JOIN product ON product.id=cart_contents.product_id WHERE cart_id=?', [id],
   function(err, rows, fields){
    if (err){
      next(err);
      return;
    }
    res.send(JSON.stringify(rows));
  });
});



/*route handler for 404 errors */
app.use(function(req,res){
  res.status(404);
  res.render('404');
});


/*route handler for 500 errors */
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){

 mysql.pool.query("INSERT INTO cart VALUES ();",
function(err, result){

        console.log(global.cartID);
        global.cartID = result.insertId;
        console.log(global.cartID);

      });


  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
