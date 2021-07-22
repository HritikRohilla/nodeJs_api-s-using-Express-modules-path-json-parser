const express = require('express');
const app = express();
const fs = require('fs')
let data = require("./data.json")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(8080, () => {
    console.log("App Listing on Port : 8080")
})
app.get("/", (req, res) => {
    let details = []
    data.forEach((data) => {
        details.push({
            "username": data.username,
            "user_role": data.user_role,
            "password": "**********",
            "products": data.products,
            "orders": data.orders
        })
    })
    res.send(details)
})

//GETTING USERS DETAILS
app.get("/users", (reg, res) => {
    let userDetails = []
    data.forEach((data) => {
        userDetails.push({ "username": data.username, "user_role": data.user_role })
    })
    res.send(userDetails)
})

//for View Orders
app.get("/orders", (reg, res) => {
    let orders = []
    data.forEach((data) => {
        orders.push({ "orders": data.orders, "username": data.username, "user_role": data.user_role })
    })
    res.send(orders)
})

//Login page
app.post("/login", async(req, res) => {
    let name = await req.body.name;
    let password = await req.body.password;
    let login_role = await req.body.loginRole;
    data.forEach((data) => {
        if (data.username === name && data.password === password) {
            res.send("User logged in")
        } else {
            res.send("User did not logged in")
        }
    })
});

//Add OWNER ACCOUNT
app.post("/add_acoount_owner", async(req, res) => {
        let user_name = await req.body.name;
        let user_password = await req.body.password;
        const role1 = "owner";
        const details_for_new_reg = {
            'username': user_name,
            'password': user_password,
            'user_role': role1,
            'products': '',
            'orders': ''
        };
        data.push(details_for_new_reg);
        fs.writeFile("./data.json", JSON.stringify(data), err => {
                if (err) {
                    console.log('Error while creating Account', err)
                } else {
                    //console.log('Successfully wrote file')
                    res.end('user created successfully')
                }

            })
            //console.log(details_for_new_reg);

        /*fs.writeFile('data.json', data, 'utf-8',
            // callback function
            function(err) {
                if (err) throw err;
                // if no error
                res.end("user created successful")
            });*/


    })
    // Place orders


// FOR PRODUCTS
app.post("/order_products", async(req, res) => {
    let user_name = await req.body.name;
    let user_password = await req.body.password;
    let product = await req.body.product;
    const role2 = "customer";
    let no_of_orders = await req.body.orders;
    const details_for_new_reg = {
        'username': user_name,
        'password': user_password,
        'user_role': role2,
        'products': product,
        'orders': no_of_orders
    };
    data.push(details_for_new_reg);
    fs.writeFile("./data.json", JSON.stringify(data), err => {
        if (err) {
            console.log('Error while placing orders', err)
        } else {
            res.end('order placed')
        }

    })
})


//FOR ADDING ACCOUNT AS A CUSTOMER
app.post("/add_acoount_customer", async(req, res) => {
    let user_name = await req.body.name;
    let user_password = await req.body.password;
    const role3 = "customer";
    const details_for_new_reg = {
        'username': user_name,
        'password': user_password,
        'user_role': role3,
        'products': '',
        'orders': ''
    };
    data.push(details_for_new_reg);
    fs.writeFile("./data.json", JSON.stringify(data), err => {
        if (err) {
            console.log('Error while creating Account', err)
        } else {
            //console.log('Successfully wrote file')
            res.end('user created successfully')
        }

    })
})