require("dotenv").config(); //for environment variables, if needed in the future and public database connection 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const EB = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const churchData = require('./init/church.js'); // Adjust path to your file
const mosquesIndia = require('./init/mosques.js');
const templeData = require('./init/temples.js');

const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('layout', 'layouts/boilerplate'); // Set the default layout
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Only one static call needed



const SACRED_DATA = {
    temples: [
        {
            name: "Uttar Pradesh",
            description: "The heartland of spiritual resonance.",
            sites: [
                { id: "kashi", name: "Kashi Vishwanath", location: "Varanasi", hours: "5:00 AM - 10:00 PM", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvoyvOoTO_JLqThGRhvMGG8cWmyZRFmbQai2qYQ-MyG7dJjdK4seN8P3ZObSulGlaRaN804hnb3haelM9q8vFgB0ltQGQTdp_Qj3UIFJmFwMGnpTUgt_s21tnRdORqbd3PCg_THUWdcbumAYn33IIomEpVm0765yVxgxxSgnTfsXtrcJ6Jg3lo93mZNPlMyom_zy6p9d1T_egsc2RGilRnX3z75yyJz06bS-27u-6KLv3HgRUB8JclsayUbAdIoz5vb9O58vC88XD0" },
                { id: "ram-mandir", name: "Ram Mandir", location: "Ayodhya", hours: "6:30 AM - 9:30 PM", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdbzIQEvxpRZR_ArAWLLv14fykxZJw5D-41XFBMpMGOu3tvIB1aU5EBI9wqLcbds1-EwGZJty1Iu_iORWBXvXqHKPtLQQHYW38kxdHff2OSbsYYQ7BzYFd23jNtDyFsw8ULij_K2pd_H5opWl4vDDhOsT9AHZjc7xPQs8G91cCBi8y6YEyeDD6t5UFvpfmbJsx-ea3Lfbr0W8BuwO3WNctXxTSvQhTHOM7MlVY7O_dLaVyEdQhMoyghyOdc7AwmlRoYjew6sNBR9V3" }
            ]
        },
        {
            name: "Tamil Nadu",
            description: "Towering Gopurams and the Dravidian legacy of stone.",
            sites: [
                { id: "meenakshi", name: "Meenakshi Amman", location: "Madurai", hours: "5:00 AM - 10:00 PM", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7A2pEffr19jTUZxXBqfnGiLNINwEkFy32xgmU9ZreIaxBk6bF41NJI3TPGj0osvmQdkVixcN4wGf1L8m-u6kT_lYbhWEY3DIZRszKI3lNAIzy5vdlhBHGaioccWqB-Gf2G007BDIy5y6Pw8PrST-yXehN8y05KDv2Zwh1Ii_h1ayaWXnwVI2mz7qSACyeQZ8Qz7sMmhIEoji9ZaIICqS4LKa5wuGjLJDpuFxz6NgC1KAd4KYlfwGdST-w8dUuaatd2lUefknz6tzz" }
            ]
        }
    ],
    mosques: [ /* Use the MOSQUE_DATA from your script.js here */ ],
    churches: [ /* Use the CHURCH_DATA from your script.js here */ ]
};




// --- Routes ---


// Example Express route
app.get('/', (req, res) => {
    res.render('pages/landing', { view: 'landing' }); // This 'landing' matches your EJS check
});

// --- 1. Specific Church Route ---
app.get("/explore/churches", (req, res) => {
    // Access the .data property because church.js exports { data: churchData }
    const churches = churchData.data; 
    
    res.render("pages/churches", { 
        churchData: churches, // Matches the loop in churches.ejs [cite: 1]
        title: "Ekatra Bharat | Sacred Architecture",
        category: "churches" // Restores bottom nav color [cite: 1]
    });
});

// --- 2. Specific Mosque Route ---
app.get("/explore/mosques", (req, res) => {
    // Access the .data property from your mosque.js export [cite: 2]
    const mosques = mosquesIndia.data;

    res.render("pages/mosques", { 
        mosqueData: mosques, // Matches the loop in mosques.ejs [cite: 2]
        category: "mosques", // Highlights the bottom nav icon [cite: 2]
        title: "Ekatra Bharat | Mosques of Bharat"
    });
});

// --- 3. Specific Temple Route ---
app.get("/explore/temples", (req, res) => {
    // Access the .data property from your templeData require
    const temples = templeData.data; 
    
    res.render("pages/temples", { 
        templeData: temples, // This MUST match line 16 in temples.ejs
        category: "temples",
        title: "Ekatra Bharat | Temples of Bharat"
    });
});

// --- 4. Dynamic Category Route (Placed LAST to avoid intercepting others) ---
app.get("/explore/:category", (req, res) => {
    const category = req.params.category;
    const data = SACRED_DATA[category];
    
    if (!data) return res.redirect("/");

    const configs = {
        temples: { title: "Temples of", accent: "Bharat", gradient: "from-[#FF9933] to-[#FFCC33]", pattern: "lotus-pattern", btnColor: "bg-primary" },
        mosques: { title: "Islamic", accent: "Heritage", gradient: "from-[#2EB62C] to-[#57C84D]", pattern: "islamic-pattern", btnColor: "bg-secondary" },
        churches: { title: "Churches of", accent: "Bharat", gradient: "from-[#35D6ED] to-[#65DDEF]", pattern: "curated-backdrop", btnColor: "bg-tertiary" }
    };

    res.render("pages/explore", { 
        regionData: data, 
        config: configs[category],
        category: category 
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about", { title: "Ekatra Bharat | About Us" });
});

app.get("/terms", (req, res) =>{
    res.render("pages/terms-conditions", { title: "Ekatra Bharat | Terms and Conditions" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});