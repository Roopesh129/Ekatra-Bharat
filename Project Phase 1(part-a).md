# 1. Basic Setup
* **Database setup**
* **REST Apis for CRUD operations**
```js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');


const MONGO_URL = "mongodb://localhost:27017/yourDatabaseName";

main()
.then(res=> console.log("Connected to DB"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.get('/', (req, res) => {
    res.send("Root is working");
})
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})

```

# 2. Listing Model
### app .js
```js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const Listing = require('./models/listing');

app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(res=> console.log("Connected to DB"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title : "My New Villa",
        description: "A beautiful villa with a sea view",
        price: 500000,
        location: "Malibu, CA",
        country: "USA",
    })
    await sampleListing.save();
    console.log("Sample listing created");
    res.send("Sample listing created");
});


app.get('/', (req, res) => {
    res.send("Root is working");
})

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})
```
### listing.js
```js
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const Schema = mongoose.Schema;

//when schema is created then only database is shown in the terminal initially after creation the DB is not seen usually in the terminal until we add some data to it

const listingSchema = new Schema({ 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://unsplash.com/photos/a-sparkly-diamond-shines-on-a-purple-background-2pB2XGpPWAE",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/a-sparkly-diamond-shines-on-a-purple-background-2pB2XGpPWAE"
        : v, // Default image link if not provided
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
```
#### collections created and found in database
```
test> use wanderlust
switched to db wanderlust
wanderlust> show collections
listings
wanderlust> db.listings.find()

wanderlust> db.listings.find()
[
  {
    _id: ObjectId('69a70fa719349b74f076ffb7'),
    title: 'Beautiful Beach House',
    description: 'A stunning beach house with breathtaking ocean views, perfect for a relaxing getaway.',
    price: 10000,
    location: 'Malibu',
    country: 'USA',
    __v: 0
  }
]
```


# 3. Data PDF
# 4. Initialize Database
### Index.js
```js
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(res=> console.log("Connected to DB"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    console.log("Deleted all listings");

    await Listing.insertMany(initData.data);
    console.log("Inserted sample listings");
}

initDB();
```
### data.js is in wrong format in the given pdf 
## following data is in correct format
```js
const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 6000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
  },
];

module.exports = { data: sampleListings };
```

# 5. Index Route
### app.js
```js
// Index Route
app.get("/listings",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});
```
### index.ejs
```html
<body>
    <h2>All Listings</h2>
    <ul>
        <% for(listing of allListings) { %>
            <li>
                <a href="/listings/<%= listing._id %>"><%= listing.title %></a>
            </li>
        <% } %>
    </ul>
    
</body>
```

# 6. READ (Show Route)
### app.js
```js
//Show Route
app.get("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  const listing =await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
})

```
### show.ejs
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
</head>

<body>
    <h3>Listing Details : </h3>
    <ul>
        <li>Title: <%= listing.title %>
        </li>
        <li>Description: <%= listing.description %>
        </li>
        <li>Price: &#8377; <%= listing.price.toLocaleString("en-IN") %>
        </li> <!--toLocaleString is used to convert the price into Indian Rupees format -->
        <li>Location: <%= listing.location %>
        </li>
        <li>Country: <%= listing.country %>
        </li>
    </ul>

</body>

</html>
```
![alt text](image.png)

# 7. CREATE (New and Create Route)
### app.js
```js
//New Route(upper than show route)
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id",async (req,res)=>{
  const {id} = req.params;
  const listing =await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
})

//Create Route
app.post("/listings", async(req,res)=>{
  //let {title, description,image, price, country, location} = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

```
### new.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
</head>
<body>
    <form action="/listings" method="post">
        <input type="text" name = "listing[title]" placeholder="enter name" required> <br> <br>
        <textarea name="listing[description]" placeholder="enter description" required></textarea> <br> <br>
        <input type="text" name="listing[image]" placeholder="enter image url" required> <br> <br>
        <input type="number" name="listing[price]" placeholder="enter price" required> <br> <br>
        <input type="text" name="listing[location]" placeholder="enter location" required> <br> <br>
        <input type="text" name="listing[country]" placeholder="enter country" required> <br> <br>
        <button type="submit">Create Listing</button>
    </form>
</body>
</html>

```

![alt text](image-1.png)
# 8. UPDATE (Edit and Update Route)
### app.js
```js
//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //spread operator to update the listing with the new data from the form
  res.redirect(`/listings/${id}`); //redirect to the show page of the updated listing

})

```
### edit.ejs
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
</head>

<body>
    <form method="post" action="/listings/<%=listing._id%>?_method=put">
        <input type="text" name="listing[title]" value="<%= listing.title %>"> <br> <br>
        <textarea name="listing[description]" placeholder="enter description"><%= listing.description %></textarea> <br>
        <br>
        <input type="text" name="listing[image]" placeholder="enter image url" value="<%= listing.image %>"> <br> <br>
        <input type="number" name="listing[price]" placeholder="enter price" value="<%= listing.price %>"> <br> <br>
        <input type="text" name="listing[location]" placeholder="enter location" value="<%= listing.location %>"> <br>
        <br>
        <input type="text" name="listing[country]" placeholder="enter country" value="<%= listing.country %>"> <br> <br>
        <button type="submit">Edit Listing</button>
    </form>
</body>

</html>
```

# 9. DELETE (Delete Route)
### app.js
```js
//Delete Route
app.delete("/listings/:id",async(req,res)=>{
  const {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted listing: ", deletedListing);
  res.redirect("/listings");
})
```
### show.ejs
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
</head>

<body>
    <h3>Listing Details : </h3>
    <ul>
        <li>Title: <%= listing.title %>
        </li>
        <li>Description: <%= listing.description %>
        </li>
        <li>Price: &#8377; <%= listing.price.toLocaleString("en-IN") %>
        </li> <!--toLocaleString is used to convert the price into Indian Rupees format -->
        <li>Location: <%= listing.location %>
        </li>
        <li>Country: <%= listing.country %>
        </li>
    </ul>

    <a href="/listings/<%=listing._id%>/edit">Edit Listing</a> <br> <br>

    <form action="/listings/<%=listing._id%>?_method=DELETE" method="POST">
        <button>Delete this Listing</button>
    </form>
</body>

</html>
```

# Complete code on app.js
```js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


//index Route 
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route(upper than show route)
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
})

//Create Route
app.post("/listings", async (req, res) => {
  //let {title, description,image, price, country, location} = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //spread operator to update the listing with the new data from the form
  res.redirect(`/listings/${id}`); //redirect to the show page of the updated listing

})

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
  const {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted listing: ", deletedListing);
  res.redirect("/listings");
})


// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description: "A beautiful villa with a sea view",
//         price: 500000,
//         location: "Malibu, CA",
//         country: "USA",
//     })
//     await sampleListing.save();
//     console.log("Sample listing created");
//     res.send("Sample listing created");
// });

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
```

