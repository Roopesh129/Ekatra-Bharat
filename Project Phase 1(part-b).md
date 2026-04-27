# 1. Creating Boiler plate
**EJS Mate??** 

**EJS mate is a package to create stylings for the website. It is a package that allows us to create a layout file that can be used for all the pages of the website. This layout file will contain the common elements of the website such as the header, footer, and navigation bar. We can then create individual files for each page of the website that will extend the layout file and add the specific content for that page.**
command to install EJS mate: 
```
npm install ejs-mate --save
```

### views/layouts/boilerplatecode.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>Wanderlust</h1>
    <div class="containder">
        <%- body %>
    </div>
</body>
</html>
```
**-->**replacing all body content in remaining templates like show.ejs, edit.ejs, index.ejs and new.ejs with <%- body %> and adding ```<% layout("/layouts/boilerplatecode.ejs") %>``` at the top of each file.

**-->** public folder is created to store all the static files like css, js and images.

ex: ```public/css/style.css```

# 2. NavBar
Navbar is constructed using Bootstrap. 
### views/includes/navbar.ejs
```html
<nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><i class="fa-regular fa-compass"></i></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active"  href="/">Home</a>
        <a class="nav-link" href="/listings">All Listings</a>
        <a class="nav-link" href="/listings/new">Add new Listings</a>
      </div>
    </div>
  </div>
</nav>
```


# 3. Footer
### views/includes/footer.ejs
```html
<footer>
    <div class="f-info">
        <div class="f-info-socials">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
        </div>
        <div class="f-info-brand">&copy; Wanderlust Private Limited</div>
        <div class="f-info-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </div>
    </div>  
</footer>
```
### public/css/style.css
```css
/* body{
    background-color: pink;
} */

/* Navbar */
.navbar {
    height: 5rem;
    background-color: white;
}

.fa-compass {
    color: #fe424d;
    font-size: 2rem;
}

.nav-link {
    color: #222222 !important;
}

/* Footer */

.f-info-links a {
    text-decoration: none;
    color: #222222;
}

.f-info-links a:hover {
    text-decoration: underline;
}

.f-info-links, .f-info-socials, .f-info-brand {
    width: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;

}

.f-info-socials i {
    margin-right: 2rem;
    font-size: 1.5rem;
}

.f-info {
    height: 8rem;
    background-color: #ebebeb;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: space-evenly;
    text-align: center;
}
```
**layouts/boilerplatecode.ejs is updated to include the navbar and footer.**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wanderlust</title>
    <link rel="stylesheet" href="/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <%- include('../includes/navbar') %>
    <div class="containder">
        <%- body %>
    </div>

    <%-include('../includes/footer') %>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>
```

# 4. Styling Index
--> listings/index.ejs is updated to include the bootstrap classes to make the page look better.
--> listings/edit.ejs is updated to include the bootstrap classes to make the page look better.
--> listings/new.ejs is updated to include the bootstrap classes to make the page look better.
--> listings/show.ejs is updated to include the bootstrap classes to make the page look bette

### Index.js
```html
<% layout("/layouts/boilerplatecode.ejs") %>
    <h2>All Listings</h2>
    <!-- <form action="/listings/new" method="get">
        <button>Create New Listing</button>
        </form> -->

    <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        <% for(listings of allListings){ %>
            <a href="/listings/<%= listings._id%>" class="listing-link">
                <div class="card col">
                    <img src="<%=listings.image%>" class="card-img-top" alt="listing_image" style="height: 20rem;">
                    <div class="card-img-overlay">

                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <b>
                                <%= listings.title %>
                            </b><br>
                            Price: &#8377; <%=listings.price.toLocaleString("en-IN") %>/night <br>
                                Location:<%= listings.location %> <br>
                        </p>
                    </div>
                </div>
            </a>
            <% } %>
    </div>

```

# 5. Styling New Listing
### new.js
```html
<% layout("/layouts/boilerplatecode.ejs") %>

    <div class="row mt-3"> <!-- division of the page into rows, bootstrap grid system -->
        <!-- //mt-3 is a bootstrap class for margin top -->
        <div class="col-8 offset-2">
            <!--division of the page into 8 columns, bootstrap grid system-->
            <!-- offset-2 is a bootstrap class that adds a left margin to the element, pushing it to the right -->
             <br>
            <h3>Create a New Listing</h3>
            <form action="/listings" method="post">
                <div class="mb-3"> <!-- // mb-3 is a bootstrap class for margin bottom -->
                    <label for="title" class="form-label">Title</label>
                    <input type="text" name="listing[title]" class="form-control" placeholder="Add a Catchy Title"
                        required>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea name="listing[description]" class="form-control" required></textarea>
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">Image Link</label>
                    <input type="text" name="listing[image]" placeholder="enter image link" class="form-control"
                        required>
                </div>

                <div class="row ">
                    <div class="mb-3 col-md-4">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" name="listing[price]" class="form-control" placeholder="1500"
                            required>
                    </div>

                    <div class="mb-3 col-md-8">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" name="listing[country]" class="form-control" placeholder="India"
                            required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input type="text" name="listing[location]" class="form-control" placeholder="Hyderabad,Telangana"
                        required>
                </div>
                <button type="submit" class="btn btn-dark add-btn mt-3">Add Listing</button>
                <br> <br>
        </div>
        </form>
    </div>
```
# 6. Styling Edit Listing
### Edit.js
```html
<% layout("/layouts/boilerplatecode.ejs") %>

<div class="row mt-3"> <!-- //mt-3 is a bootstrap class for margin top -->
<div class="row col-8 offset-2">
<h3>Edit Your Listing</h3>

<form method="post" action="/listings/<%=listing._id%>?_method=put">

    <div class="mb-3">
        <label for="title"class="form-label" >Title</label>
        <input type="text" name="listing[title]" value="<%= listing.title %>" class="form-control" placeholder="enter Title">
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea name="listing[description]" placeholder="enter description" class="form-control"><%= listing.description %></textarea>
    </div>

    <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input type="text" name="listing[image]" placeholder="enter image url" value="<%= listing.image %>" class="form-control">
    </div>


    <div class="row">
        <div class="mb-3 col-md-4">
        <label for="price" class="form-label">Price</label>
        <input type="number" name="listing[price]" placeholder="enter price" value="<%= listing.price %>" class="form-control">
        </div>

        <div class="mb-3 col-md-8">
        <label for="country" class="form-label">Country</label>
        <input type="text" name="listing[country]" placeholder="enter country" value="<%= listing.country %>" class="form-control">
        </div>
    </div>
    
    <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <input type="text" name="listing[location]" placeholder="enter location" value="<%= listing.location %>" class="form-control">
    </div>
    
    <button type="submit" class="btn btn-dark edit-btn mt-3">Edit Listing</button>
    <br> <br>
</form>
</div>
</div>
```

# 7. Styling Show Listing
### show.js
```html
<% layout("/layouts/boilerplatecode.ejs") %>

    <div class="row mt-3">
        <div class="col-8 offset-3">
            <h3>Listing Details : </h3>
        </div>
        <div class="card col-6 offset-3 show-card">
            <!-- //col-6 used to set the 6 parts of column and rest 6 parts are used as offset to center the card -->
            <img src="<%= listing.image %>" class="card-img-top show-img" alt="listing_image">
            <div class="card-body">
                <p class="card-text">
                    <b>Title : <%= listing.title %></b> <br>
                    Description : <%= listing.description %> <br>
                    Price : &#8377; <%= listing.price.toLocaleString("en-IN") %> <br>
                    Location : <%= listing.location %> <br>
                    Country : <%= listing.country %>
                </p>
            </div>
        </div>

<br>
        <a href="/listings/<%=listing._id%>/edit" class="btn dark-btn edit-btn col-1 offset-3 " >Edit</a>
         
        <form action="/listings/<%=listing._id%>?_method=DELETE" method="POST" >
            <button class="btn btn-dark offset-4 col-1  del-btn">Delete</button>
            <br> <br>
        </form>
    </div>
    <br> <br>

```


### All CSS design for the above pages is added in public/css/style.css file.
### style.css
```css
body {
  font-family: "Plus Jakarta Sans", sans-serif !important;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.conatainer{
    flex: 1;
}
/* Navbar */
.navbar {
    height: 5rem;
    background-color: white;
}

.fa-compass {
    color: #fe424d;
    font-size: 2rem;
}

.nav-link {
    color: #222222 !important;
}

/* Footer */

.f-info-links a {
    text-decoration: none;
    color: #222222;
}

.f-info-links a:hover {
    text-decoration: underline;
}

.f-info-links, .f-info-socials, .f-info-brand {
    width: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;

}

.f-info-socials i {
    margin-right: 2rem;
    font-size: 1.35rem;
}

.f-info {
    height: 8rem;
    background-color: #ebebeb;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: space-evenly;
    text-align: center;
}
/*Cards*/
.card{
    border: none !important;
    margin-bottom: 2rem;
}
.card-img-top{
    border-radius: 1rem;
    width: 100% !important;
    object-fit: cover !important;
}
.card-body{
    padding: 0 !important;
}
.card-text p{
    font-weight: 400;
}
.listing-link{
    text-decoration: none;
}

/* Card Effects */
.card-img-overlay:hover{
    opacity: 0.2;
    background-color: white;
}
/* New page */
.add-btn{
    background-color: #fe424d !important;
    border: none !important;
}

/* Edit page */

.edit-btn{
    background-color: #fe424d !important;
    border: none !important;
    
}

/* Show page */
.show-img{
    height: 30vh;
}

.show-card{
    padding-left: 0;
    padding-right: 0;
}

/* Delete-btn */
.del-btn{
    background-color: black !important;
    border: none !important;
    margin-top: -4rem;
    margin-left:10px
}
```

### result after styling
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)