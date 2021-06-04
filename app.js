const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const alert = require("alert");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(session({
  secret: "Our little Secret",
  resave: false,
  uninitialized: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/swagDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);
const itemSchema = new mongoose.Schema({
  name: String,
  source: String,
  rating: Number,
  price: Number,
  quantity: Number
});
const Item = mongoose.model("Item", itemSchema);

const userSchema = new mongoose.Schema({
  // username:String,
  email: String,
  password: String
  // googleId:String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
// passport.use(new LocalStrategy({
//
//     username: 'username',
//
//   },User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
// const item1=new Item({
//   name:"Red Printed T-Shirt",
//   source:"images/product-2.jpg",
//   rating:5,
//   price:899
// });
// const item2=new Item({
//   name:"Puma Men Black Mesh Running Enzo 2 Shoes",
//   source:"images/product-20.jpg",
//   rating:4,
//   price:2499
// });
// const item3=new Item({
//   name:"Men Grey Slim Fit Checked Regular Trousers",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/1/4/defba343-26f7-4cf4-ad96-41c1440fcadf1546588177553-1.jpg",
//   rating:5,
//   price:999
// });
// const item4=new Item({
//   name:"Men Navy Blue Solid Embroidered Polo T-shirt",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10574868/2019/12/10/263f9f8e-8228-493e-b704-4fb1b3df59101575952183111-Roadster-Men-Tshirts-7291575952181139-1.jpg",
//   rating:4,
//   price:1399
// });
// const item5=new Item({
//   name:"Men White Sneakers",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12067984/2021/2/2/0425f19a-852a-45e6-a1f6-7c80526a158f1612240158034-HIGHLANDER-Men-White-Sneakers-2351612240156845-6.jpg",
//   rating:3,
//   price:895
// });
// const item6=new Item({
//   name:"Men Black Solid Round Neck Energy SS Tee T-shirt",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9293209/2019/4/13/da938f80-6464-45cf-9e5b-bcc885eb97e41555148565429-Puma-Men-Black-Round-Neck-T-shirt-5761555148564503-1.jpg",
//   rating:4,
//   price:799
// });
// const item7=new Item({
//   name:"Men Ankle length Pack of 3 Terry Socks",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/976817/2018/10/4/4db844a2-89c9-46a4-9ccf-c2b8db3306fb1538652963787-HRX-by-Hrithik-Roshan-Active-Men-Set-of-3-Ankle-Length-Socks-1.jpg",
//   rating:5,
//   price:384
// });
// const item8=new Item({
//   name:"Redrev T Men Red Analogue Watch 830588",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8804501/2019/4/1/67f783f4-7399-4cf5-850a-00a5c7863d4b1554125361035-SCUDERIA-FERRARI-Men-Red-Analogue-Watch-830588-3961554125359-1.jpg",
//   rating:5,
//   price:16950
// });
// const item9=new Item({
//   name:"Men Olive Green Analogue Watch D-BT01-OLGU",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11860212/2020/5/27/2e7c5421-33b8-473a-9f2b-eccfc09e7be81590579802812MVMTMenGreenAnalogueWatch1.jpg",
//   rating:5,
//   price:9912
// });
// const item10=new Item({
//   name:"Men Navy Mesh Running Shoes",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11981342/2021/3/23/797dbb3c-410f-4509-8fda-87bca3242fcc1616502480540-HRX-by-Hrithik-Roshan-Men-Navy-Mesh-Running-Shoes-6371616502-1.jpg",
//   rating:4,
//   price:2419
// });
// const item11=new Item({
//   name:"Men Grey Solid Driving Shoes",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13639120/2021/4/12/cc99e032-5725-49e0-9d37-2b9f75b4ad1f1618217710784-US-Polo-Assn-Men-Casual-Shoes-4951618217710255-1.jpg",
//   rating:4,
//   price:2209
// });
// const item12=new Item({
//   name:"Navy Track Pants",
//   source:"https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1088888/2016/5/11/11462961543084-Hubberholme-Navy-Tailored-Fit-Track-Pants-921462961542776-1.jpg",
//   rating:5,
//   price:750
// });
// const defaultItems=[];
// Item.updateOne({_id:"60ae4f255598e47494218d3f"},{source:"images/product-1.jpg"},function(err){
//   if(err)
//   console.log(err);
//   else
//   {
// console.log("Successfully Updated");
//   }
// });
// Item.deleteOne({name:"Red Printed T-Shirt"},function(err){
//   if(err)
//   {
//     console.log(err);
//   }else{
//     console.log("Successfully deleted");
//   }
// });
app.get("/", function(req, res) {
  if (req.isAuthenticated())
    res.render("home");
  else
    res.render("account");



});
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/account");
})
app.post("/cf", function(req, res) {
  res.redirect("/home");
})
app.post("/thank-you", function(req, res) {
  res.redirect("/home");
})
app.get("/login", function(req, res) {

  if (req.isAuthenticated())
    res.render("home");
  else
    res.render("account");
});
app.post("/home", function(req, res) {
  res.redirect("/home");
})
app.get("/workingonit", function(req, res) {
  res.render("workingonit");
})
app.get("/register", function(req, res) {
  if (req.isAuthenticated())
    res.render("home");
  else
    res.render("account");
});
app.post("/register", function(req, res, next) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      // popup.alert({
      //     content: 'Sorry,try with some other mail.'
      // });

      res.redirect("/registration-failure");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/home");
      });
    }
  });
});

// app.post("/login",function(req,res){
//   const user=new User({
//
//   username:req.body.username,
//   email:req.body.email,
//     password:req.body.password
//   });
//   req.login(user,function(err){
//     if(err){
//       console.log(err);
// alert('Sorry,wrong id or password');
//         res.redirect("/account");
//     }else{
//       passport.authenticate("local",{})(req,res,function(){
//         successRedirect: '/home',
//         alert('Sorry,wrong id or password'),
//          failureRedirect: '/account'
//       });
//     }
//   });
// });
app.post('/login', (req, res) => passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login-failure',
})(req, res));
app.post("/add1", function(req, res) {
  Item.findOne({
    name: "Red Printed T-Shirt"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item1 = new Item({
          name: "Red Printed T-Shirt",
          source: "images/product-1.jpg",
          rating: 5,
          price: 899,
          quantity: req.body.quantity1

        });
        item1.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
const {
  ObjectId
} = require('mongodb');

app.post("/remove", function(req, res) {
  let itemId = req.body.itemId;
  console.log("11");
  console.log(itemId);
  console.log("22");
  Item.remove({
    _id: itemId
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted");
      res.redirect("cart-details");
    }
  });

});


app.post("/failure", function(req, res) {
  res.redirect("/account");
})
app.post("/add2", function(req, res) {
  Item.findOne({
    name: "Puma Men Black Mesh Running Enzo 2 Shoes"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item2 = new Item({
          name: "Puma Men Black Mesh Running Enzo 2 Shoes",
          source: "images/product-20.jpg",
          rating: 4,
          price: 2499,
          quantity: req.body.quantity
        });
        item2.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add3", function(req, res) {
  Item.findOne({
    name: "Men Grey Slim Fit Checked Regular Trousers"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item3 = new Item({
          name: "Men Grey Slim Fit Checked Regular Trousers",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/1/4/defba343-26f7-4cf4-ad96-41c1440fcadf1546588177553-1.jpg",
          rating: 5,
          price: 999,
          quantity: req.body.quantity
        });
        item3.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add4", function(req, res) {
  Item.findOne({
    name: "Men Navy Blue Solid Embroidered Polo T-shirt"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item4 = new Item({
          name: "Men Navy Blue Solid Embroidered Polo T-shirt",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10574868/2019/12/10/263f9f8e-8228-493e-b704-4fb1b3df59101575952183111-Roadster-Men-Tshirts-7291575952181139-1.jpg",
          rating: 4,
          price: 1399,
          quantity: req.body.quantity
        });
        item4.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add5", function(req, res) {
  Item.findOne({
    name: "Men White Sneakers"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item5 = new Item({
          name: "Men White Sneakers",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12067984/2021/2/2/0425f19a-852a-45e6-a1f6-7c80526a158f1612240158034-HIGHLANDER-Men-White-Sneakers-2351612240156845-6.jpg",
          rating: 3,
          price: 895,
          quantity: req.body.quantity
        });
        item5.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add6", function(req, res) {
  Item.findOne({
    name: "Men Black Solid Round Neck Energy SS Tee T-shirt"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item6 = new Item({
          name: "Men Black Solid Round Neck Energy SS Tee T-shirt",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9293209/2019/4/13/da938f80-6464-45cf-9e5b-bcc885eb97e41555148565429-Puma-Men-Black-Round-Neck-T-shirt-5761555148564503-1.jpg",
          rating: 4,
          price: 799,
          quantity: req.body.quantity
        });
        item6.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add7", function(req, res) {
  Item.findOne({
    name: "Men Ankle length Pack of 3 Terry Socks"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item7 = new Item({
          name: "Men Ankle length Pack of 3 Terry Socks",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/976817/2018/10/4/4db844a2-89c9-46a4-9ccf-c2b8db3306fb1538652963787-HRX-by-Hrithik-Roshan-Active-Men-Set-of-3-Ankle-Length-Socks-1.jpg",
          rating: 5,
          price: 384,
          quantity: req.body.quantity
        });
        item7.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add8", function(req, res) {
  Item.findOne({
    name: "Redrev T Men Red Analogue Watch 830588"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item8 = new Item({
          name: "Redrev T Men Red Analogue Watch 830588",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8804501/2019/4/1/67f783f4-7399-4cf5-850a-00a5c7863d4b1554125361035-SCUDERIA-FERRARI-Men-Red-Analogue-Watch-830588-3961554125359-1.jpg",
          rating: 5,
          price: 16950,
          quantity: req.body.quantity
        });
        item8.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add9", function(req, res) {
  Item.findOne({
    name: "Men Olive Green Analogue Watch D-BT01-OLGU"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item9 = new Item({
          name: "Men Olive Green Analogue Watch D-BT01-OLGU",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11860212/2020/5/27/2e7c5421-33b8-473a-9f2b-eccfc09e7be81590579802812MVMTMenGreenAnalogueWatch1.jpg",
          rating: 5,
          price: 9912,
          quantity: req.body.quantity
        });
        item9.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add10", function(req, res) {
  Item.findOne({
    name: "Men Navy Mesh Running Shoes"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item10 = new Item({
          name: "Men Navy Mesh Running Shoes",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11981342/2021/3/23/797dbb3c-410f-4509-8fda-87bca3242fcc1616502480540-HRX-by-Hrithik-Roshan-Men-Navy-Mesh-Running-Shoes-6371616502-1.jpg",
          rating: 4,
          price: 2419,
          quantity: req.body.quantity
        });
        item10.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add11", function(req, res) {
  Item.findOne({
    name: "Men Grey Solid Driving Shoes"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item11 = new Item({
          name: "Men Grey Solid Driving Shoes",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13639120/2021/4/12/cc99e032-5725-49e0-9d37-2b9f75b4ad1f1618217710784-US-Polo-Assn-Men-Casual-Shoes-4951618217710255-1.jpg",
          rating: 4,
          price: 2209,
          quantity: req.body.quantity
        });
        item11.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.post("/add12", function(req, res) {
  Item.findOne({
    name: "Navy Track Pants"
  }, function(err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const item12 = new Item({
          name: "Navy Track Pants",
          source: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1088888/2016/5/11/11462961543084-Hubberholme-Navy-Tailored-Fit-Track-Pants-921462961542776-1.jpg",
          rating: 5,
          price: 750,
          quantity: req.body.quantity
        });
        item12.save();

        res.redirect("cart-details");
      } else {
        res.redirect("cart-details");
      }
    }
  });
});
app.get("/home", function(req, res) {
  if (req.isAuthenticated())
    res.render("home");
  else
    res.render("account");
})
app.get("/products", function(req, res) {
  if (req.isAuthenticated())
    res.render("products");
  else
    res.render("account");
});
app.get("/account", function(req, res) {
  if (req.isAuthenticated())
    res.render("home");
  else
    res.render("account");
});
app.post("/checkout", function(req, res) {

  Item.find({}, function(err, items) {
    let sum = 0;
    items.forEach(function(element) {
      sum += ((element.price) * (element.quantity));
    });
    if (sum)
      res.render("address-page");
    else
      res.render("checkout-failure");
  });

});
app.get("/address-page", function(req, res) {
  res.render("address-page");

});
app.get("/checkout-failure", function(req, res) {
  res.render("checkout-failure");

});
app.get("/cart-details", function(req, res) {

  if (req.isAuthenticated()) {
    Item.find({}, function(err, items) {
      let sum = 0;
      items.forEach(function(element) {
        sum += ((element.price) * (element.quantity));
      });
      let tax = sum / 10;
      res.render("cart-details", {
        listItems: items,
        Subtotal: sum,
        tax: tax,
        total: sum + tax
      });
    });
  } else
    res.render("account");

});
app.get("/Contact", function(req, res) {
  if (req.isAuthenticated())
    res.render("Contact");
  else
    res.render("account");
});
app.get("/registration-failure", function(req, res) {
  res.render("registration-failure");
})
app.get("/login-failure", function(req, res) {
  res.render("login-failure");
})
app.get("/About", function(req, res) {
  if (req.isAuthenticated())
    res.render("About");
  else
    res.render("account");
})
app.get("/product-details-1", function(req, res) {
  Item.find({}, function(err, items) {
    res.render("product-details-1", {
      listItems: items
    });
  });

});
app.get("/product-details-2", function(req, res) {
  res.render("product-details-2");
})
app.get("/product-details-3", function(req, res) {
  res.render("product-details-3");
})
app.get("/product-details-4", function(req, res) {
  res.render("product-details-4");
})
app.get("/product-details-5", function(req, res) {
  res.render("product-details-5");
})
app.get("/product-details-6", function(req, res) {
  res.render("product-details-6");
})
app.get("/product-details-7", function(req, res) {
  res.render("product-details-7");
})
app.get("/product-details-8", function(req, res) {
  res.render("product-details-8");
})
app.get("/product-details-9", function(req, res) {
  res.render("product-details-9");
})
app.get("/product-details-10", function(req, res) {
  res.render("product-details-10");
})
app.get("/product-details-11", function(req, res) {
  res.render("product-details-11");
})
app.get("/product-details-12", function(req, res) {
  res.render("product-details-12");
})


app.listen(3000, function() {
  console.log("Server started at port 3000");
});
