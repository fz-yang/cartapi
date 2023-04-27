const express = require("express");
const app = express();
const db =require("./mysql.js")
const cors = require("cors");
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

app.listen(3000,function(){
    console.log(123);
});
app.get("/", function(req,res) {
    res.send("Welcome");
})

app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId;
  
    // 查詢購物車中所有商品
    const query = `SELECT c.id, c.product_id, p.name, c.quantity, p.price, (c.quantity * p.price) AS total_price
                   FROM cart_items AS c
                   JOIN products AS p ON c.product_id = p.id
                   WHERE c.user_id = ?`;
    db.connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
        return;
      }
  
      // 如果沒有任何商品在購物車中，則返回空陣列
      if (results.length === 0) {
        res.status(200).json([]);
        return;
      }
  
      // 將查詢結果轉換為JSON格式
      const cartItems = results.map(item => ({
        id: item.id,
        productId: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.total_price
      }));
  
      res.status(200).json(cartItems);
    });
  });
  

  app.post('/cart/:userId/add', (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
  
    // 檢查用戶ID和商品ID是否存在
    if (!userId || !productId) {
      res.status(400).json({
        success: false,
        message: "User ID and product ID are required"
      });
      return;
    }
  
    // 檢查數量是否大於0
    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0"
      });
      return;
    }
  
    // 檢查是否已經存在相同的記錄
    const query = `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`;
    db.connection.query(query, [userId, productId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
        return;
      }
  
      if (results.length > 0) {
        // 如果存在相同的記錄，更新數量
        const updateQuery = `UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;
        db.connection.query(updateQuery, [quantity, userId, productId], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error"
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "Product quantity updated successfully"
          });
        });
      } else {
        // 如果不存在相同的記錄，插入新的購物車記錄
        const insertQuery = `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.connection.query(insertQuery, [userId, productId, quantity], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Server error"
            });
            return;
          }
  
          res.status(200).json({
            success: true,
            message: "Product added to cart_items successfully"
          });
        });
      }
    });
  });