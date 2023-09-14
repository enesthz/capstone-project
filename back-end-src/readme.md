# Migrations

The required library must be installed before migrations are run;

- `npm install -g migrate-mongo`

  Then go to the migrations folder in the service folder and run the following command here.

- `migrate-mongo up`

# User Service

## Endpoints

### `GET /customers/:id`

Retrieves a customer.

#### Query Parameters

- `id` : The ID of customers.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an customer object:

```json
{
  "_id": "64ab9fb2195e9b47fc5e2cbb",
  "name": "Halile",
  "surname": "Bozkır",
  "gender": "FEMALE",
  "phone": "67890",
  "password": "$2b$10$oCHxIY2K73cjxKbypwRxFeIERhPbzm5wjhuz.inj1CDgYj8oEFvBG",
  "__v": 0
}
```

<hr>

### `GET /customers`

Retrieves a list of customers.

#### Body Parameters

- `ids` : The ID list of customers. It might be an empty array and returns all users in this case.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an array of customer objects:

```json
	[{
		"_id": "64ab9fb2195e9b47fc5e2cbb",
		"name": "Halile",
		"surname": "Bozkır",
		"gender": "FEMALE",
		"phone": "67890",
		"password": "$2b$10$oCHxIY2K73cjxKbypwRxFeIERhPbzm5wjhuz.inj1CDgYj8oEFvBG",
		"__v": 0
	},
	{
		"_id": "64ab9fcc195e9b47fc5e2cc1",
		"name": "Celilem",
		"surname": "Bozkır",
		"gender": "FEMALE",
		"phone": "67890",
		"password": "$2b$10$dwh3znbzUTMm6Dx9Wopx9.20PfekKZP/rG4VTxmjf54bMR4o.rkm6",
		"__v": 0
	}],
```

<hr>

### `POST /customers/register`

Creates a new customer.

#### Body Parameters

- `name` : The name of new user.
- `surname` : The surname of new user.
- `gender` :The gender of new user. (Enum: `FEMALE` or `MALE`)
- `phone` : The phone of new user (String)
- `password` : The password of new user
- `email` : The email of new user

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{ "message": "Customer successfully added." }
```

<hr>

### `POST /customers/login`

Login wwith an account.

#### Body Parameters

- `email` : The email of an account
- `password` : The password of an account

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVraW5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJcTdqZXlVbDJHNHpjREkyNDd4YWF1ajVUL3RjWlJSV3ZtNEFkcWo2NWRyY0QzVDlQM2JGVyIsImlhdCI6MTY5MjMxMzM3NH0.tP5i66p93FInma2gGO3D_-o5zQ6lpK2QLQ2DdoBVBJE"
}
```

<hr>

### `GET /customers/"userid"`

Encode the token.

#### Authorization Parameters
- Choose Bearer Token then paste the token which you get on login.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{
    "_id": "64de96dbdbce1a34eac1b5ef",
    "name": "ekin",
    "surname": "ekin",
    "email": "ekin@example.com",
    "gender": "MALE",
    "phone": "123456342378290",
    "password": "$2b$10$Iq7jeyUl2G4zcDI247xaauj5T/tcZRRWvm4Adqj65drcD3T9P3bFW",
    "address": "asd dqwdwa 213",
    "__v": 0
}
```

<hr>


### `PUT /customers/:id`

Updates a customer by ID.

#### Query Parameters

- `id` : The id of user.

#### Body Parameters

- `name` : The name of new user.
- `surname` : The surname of new user.
- `gender` :The gender of new user. (Enum: `FEMALE` or `MALE`)
- `phone` : The phone of new user (String)
- `email` : The email of new user

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an updated customer object:

```json
{
  "_id": "64ab9fcc195e9b47fc5e2cc1",
  "name": "Celilem",
  "surname": "Bozkır",
  "gender": "FEMALE",
  "phone": "67890",
  "password": "$2b$10$dwh3znbzUTMm6Dx9Wopx9.20PfekKZP/rG4VTxmjf54bMR4o.rkm6",
  "__v": 0
}
```

<hr>

### `DELETE /customers/:id`

Deletes a customer by ID.

#### Query Parameters

- `id` : The id of user.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing successful message and deleted customer datas:

```json
{
      "message": "Customer deleted successfully",
     {
		"_id": "64ab9fcc195e9b47fc5e2cc1",
		"name": "Celilem",
		"surname": "Bozkır",
		"gender": "FEMALE",
		"phone": "67890",
		"password": "$2b$10$dwh3znbzUTMm6Dx9Wopx9.20PfekKZP/rG4VTxmjf54bMR4o.rkm6",
		"__v": 0
	}
}
```

<hr>

# Employee Service

## Endpoints

### `GET /employees/:id`

Retrieves a employee.

#### Query Parameters

- `id` : The ID of employees.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an employee object:

```json
{
	"_id": "64ae9407e19a3ea51622ae01"
	"name": "asd"
	"surname": "fasd"
	"email": "john@example.com"
	"gender": "FEMALE"
	"phone": "1234567890"
	"password": "password123"
	"address": "123 Main Street"
	"__v": "0"
}
```

<hr>
### `GET /employees`

Retrieves a list of employees.

#### Body Parameters

- `ids` : The ID list of employees. It might be an empty array and returns all users in this case.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an array of employee objects:

```json
[{
	"_id": "64ae9407e19a3ea51622ae01"
	"name": "asd"
	"surname": "fasd"
	"email": "john@example.com"
	"gender": "FEMALE"
	"phone": "1234567890"
	"password": "password123"
	"address": "123 Main Street"
	"__v": "0"
},
{
	"_id": "64ae951667ebc329bc150477"
	"name": "fasda"
	"surname": "fsdfsd"
	"email": "asd@example.com"
	"gender": "FEMALE"
	"phone": "12345678290"
	"password": "$2b$10$0g.q.MydiAbXMYtFI8g9NuzIlFHHsAOLoOWmwE64/AMKJRfruM4Ji"
	"address": "123 Main Street"
	"__v": "0"
}],
```

<hr>

### `POST /employees/register`

Creates a new employee.

#### Body Parameters

- `name` : The name of new user.
- `surname` : The surname of new user.
- `email` : The email of new user
- `gender` :The gender of new user. (Enum: `FEMALE` or `MALE`)
- `phone` : The phone of new user (String)
- `password` : The password of new user
- `address` : The address of new user

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{ "message": "Employee successfully added." }
```

<hr>

### `POST /employees/login`

Login wwith an account.

#### Body Parameters

- `email` : The email of an account
- `password` : The password of an account

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVraW5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJcTdqZXlVbDJHNHpjREkyNDd4YWF1ajVUL3RjWlJSV3ZtNEFkcWo2NWRyY0QzVDlQM2JGVyIsImlhdCI6MTY5MjMxMzM3NH0.tP5i66p93FInma2gGO3D_-o5zQ6lpK2QLQ2DdoBVBJE"
}
```
<hr>

### `GET /employees/"userid"`

Encode the token.

#### Authorization Parameters
- Choose Bearer Token then paste the token which you get on login.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing a successful message:

```json
{
    "_id": "64de96dbdbce1a34eac1b5ef",
    "name": "ekin",
    "surname": "ekin",
    "email": "ekin@example.com",
    "gender": "MALE",
    "phone": "123456342378290",
    "password": "$2b$10$Iq7jeyUl2G4zcDI247xaauj5T/tcZRRWvm4Adqj65drcD3T9P3bFW",
    "address": "asd dqwdwa 213",
    "__v": 0
}
```

<hr>

### `PUT /employees/:id`

Updates a employee by ID.

#### Query Parameters

- `id` : The id of user.

#### Body Parameters

- `name` : The name of new user.
- `surname` : The surname of new user.
- `gender` :The gender of new user. (Enum: `FEMALE` or `MALE`)
- `phone` : The phone of new user (String)
- `email` : The email of new user
- `address` : The address of new user

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing an updated employee object:

```json
{
	"_id": "64ae951667ebc329bc150477"
	"name": "fasda"
	"surname": "fsdfsd"
	"email": "asd@example.com"
	"gender": "FEMALE"
	"phone": "12345678290"
	"password": "$2b$10$0g.q.MydiAbXMYtFI8g9NuzIlFHHsAOLoOWmwE64/AMKJRfruM4Ji"
	"address": "123 Main Street"
	"__v": "0"
}
```

<hr>

### `DELETE /employees/:id`

Deletes a employee by ID.

#### Query Parameters

- `id` : The id of user.

#### Response

A successful response will have a status code of `200 OK` and a JSON body containing successful message and deleted employee datas:

```json
{
      "message": "Employee deleted successfully",
     {
	"_id": "64ae951667ebc329bc150477"
	"name": "fasda"
	"surname": "fsdfsd"
	"email": "asd@example.com"
	"gender": "FEMALE"
	"phone": "12345678290"
	"password": "$2b$10$0g.q.MydiAbXMYtFI8g9NuzIlFHHsAOLoOWmwE64/AMKJRfruM4Ji"
	"address": "123 Main Street"
	"__v": "0"
	}
}
```

<hr>

# Product Service

## Endpoints

### `GET /products`

Retrieves products based on provided IDs and filters.

- **Method**: `GET`
- **URL**: `/products`
- **Body Parameters**:
  - `ids` (optional): An array of product IDs. If not provided, returns all products.
  - `filters` (optional): Additional filters to apply.
    - `categories` (optional): An array of category IDs
    - `title` (optional): String - this filter is using for searching products by title.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing an array of product objects:

  ```json
  [
    {
      "id": "product_id",
      "title": "product_title",
      "description": "product_description",
      ...
    },
    ...
  ]
  ```

### `GET /products/:id`

Retrieves a product by its ID.

- **Method**: `GET`
- **URL**: `/products/:id`
- **URL Parameters**:
  - `id` (required): The ID of the product.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing the product object:

  ```json
  {
    "id": "product_id",
    "title": "product_title",
    "description": "product_description",
    ...
  }
  ```

### `POST /products`

Creates a new product.

- **Method**: `POST`
- **URL**: `/products`
- **Body Parameters**:
  - `title` (required): The title of the product.
  - `images` (required): An array of product images.
  - `description` (required): The description of the product.
  - `color` (optional): The color of the product.
  - `warranty` (required): The warranty information of the product.
  - `memory` (optional): The memory capacity of the product.
  - `screenSize` (optional): The screen of the product.
  - `OS` (optional): The OS of the product.
  - `RAM` (optional): The RAM capacity of the product.
  - `GraphicCard` (optional): Thegraphic card of the product.
  - `price` (required): The price of the product.
  - `stockCount` (required): The stock count of the product.
  - `categoryId` (required): The ID of the category the product belongs to.
  - `brandId` (required): The ID of the brand associated with the product.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Product successfully created!"
  }
  ```

### `DELETE /products/:id`

Deletes a product by its ID.

- **Method**: `DELETE`
- **URL**: `/products/:id`
- **URL Parameters**:
  - `id` (required): The ID of the product.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Product deleted successfully!"
  }
  ```

### `PUT /products/:id`

Updates a product by its ID.

- **Method**: `PUT`
- **URL**: `/products/:id`
- **URL Parameters**:
  - `id` (required): The ID of the product.
- **Body Parameters**:
- `title` (required): The title of the product.
- `description` (required): The description of the product.
- `color` (optional): The color of the product.
- `warranty` (required): The warranty information of the product.
- `memory` (optional): The memory capacity of the product.
- `screenSize` (optional): The screen of the product.
- `OS` (optional): The OS of the product.
- `RAM` (optional): The RAM capacity of the product.
- `GraphicCard` (optional): Thegraphic card of the product.
- `price` (required): The price of the product.
- `stockCount` (required): The stock count of the product.
- `categoryId` (required): The ID of the category the product belongs to.
- `brandId` (required): The ID of the brand associated with the product.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing the updated product object:

  ```json
  {
    "id": "product_id",
    "title": "updated_title",
    "description": "updated_description",
    ...
  }
  ```

### `POST /products/:id/comments`

Adds a comment to a product.

- **Method**: `POST`
- **URL**: `/products/:id/comments`
- **URL Parameters**:
  - `id` (required): The ID of the product.
- **Body Parameters**:
  - `rate` (required): The rating of the comment.
  - `userId` (required): The ID of the user who posted the comment.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Comment successfully added!"
  }
  ```

### `PUT /products/:id/comments/:commentId`

Deletes a comment from a product.

- **Method**: `PUT`
- **URL**: `/products/:id/comments/:commentId`
- **URL Parameters**:
  - `id` (required): The ID of the product.
  - `commentId` (required): The ID of the comment.
- **Body Parameters**:
  - `rate` (required): The rate.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "_id": "64bc40c7ba53bffc1890367f",
    "title": "Sample Product",
    "images": ["..."],
    "description": "Sample product description",
    "warranty": 1,
    "color": "Red",
    "memory": "8GB",
    "screenSize": null,
    "OS": null,
    "RAM": null,
    "GraphicCard": null,
    "price": 99.99,
    "stockCount": 10,
    "comments": [
      {
        "user": "64ab9fb2195e9b47fc5e2cbb",
        "rate": 12,
        "_id": "64bce97358bd5ac8b2199306"
      },
      {
        "user": "64ab9fb2195e9b47fc5e2cbb",
        "rate": 119,
        "_id": "64bce9a958bd5ac8b2199308"
      },
      {
        "user": "64ab9fb2195e9b47fc5e2cbb",
        "rate": 14,
        "_id": "64bce9ad58bd5ac8b219930a"
      },
      {
        "user": "64ab9fb2195e9b47fc5e2cbb",
        "rate": 15,
        "_id": "64bce9b058bd5ac8b219930c"
      }
    ],
    "__v": 0,
    "signedImageURLs": ["somesignedurl.invalid"],
    "id": "64bc40c7ba53bffc1890367f"
  }
  ```

### `DELETE /products/:id/comments/:commentId`

Deletes a comment from a product.

- **Method**: `DELETE`
- **URL**: `/products/:id/comments/:commentId`
- **URL Parameters**:
  - `id` (required): The ID of the product.
  - `commentId` (required): The ID of the comment.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Comment successfully deleted!"
  }
  ```

# Brands

## Endpoints

### `GET /brands`

Retrieves all brands.

- **Method**: `GET`
- **URL**: `/brands`
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing an array of brand objects:

  ```json
  [
    {
      "id": "brand_id",
      "logo": "brand_logo",
      "name": "brand_name"
    },
    ...
  ]
  ```

### `GET /brands/:id`

Retrieves a brand by its ID.

- **Method**: `GET`
- **URL**: `/brands/:id`
- **URL Parameters**:
  - `id` (required): The ID of the brand.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing the brand object:

  ```json
  {
    "id": "brand_id",
    "logo": "brand_logo",
    "name": "brand_name"
  }
  ```

### `POST /brands`

Creates a new brand.

- **Method**: `POST`
- **URL**: `/brands`
- **Body Parameters**:
  - `logo` (required): The logo of the brand.
  - `name` (required): The name of the brand.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Brand successfully created!"
  }
  ```

# Category

## Endpoints

### `GET /categories`

Retrieves all categories.

- **Method**: `GET`
- **URL**: `/categories`
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing an array of category objects:

  ```json
  [
    {
      "id": "category_id",
      "title": "category_title"
    },
    ...
  ]
  ```

### `GET /categories/:id`

Retrieves a category by its ID.

- **Method**: `GET`
- **URL**: `/categories/:id`
- **URL Parameters**:
  - `id` (required): The ID of the category.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing the category object:

  ```json
  {
    "id": "category_id",
    "title": "category_title"
  }
  ```

### `POST /categories`

Creates a new category.

- **Method**: `POST`
- **URL**: `/categories`
- **Body Parameters**:
  - `title` (required): The title of the category.
- **Response**:

  A successful response will have a status code of `200 OK` and a JSON body containing a success message:

  ```json
  {
    "message": "Category successfully created!"
  }
  ```

  # Cart Service

## Base URL

The base URL for this API is `/carts`.

## Get Shopping Cart by ID

### Endpoint

`GET /carts/:id`

### Description

Retrieves a shopping cart by its ID.

### Parameters

- `id` (required): The ID of the shopping cart to retrieve.

### Response

- Status Code: 200 OK
- Content: JSON object representing the shopping cart.
  Example:
  ```json
  {
    "user": "user_id",
    "cartItems": [
      {
        "product": {
          "name": "Product A",
          "price": 19.99
        },
        "quantity": 2
      },
      {
        "product": {
          "name": "Product B",
          "price": 9.99
        },
        "quantity": 1
      }
    ]
  }
  ```

## Get Shopping Cart by User ID

### Endpoint

`GET /carts/users/:id`

### Description

Retrieves a user's shopping cart along with populated cart items containing product information.

### Parameters

- `id` (required): The ID of the user.

### Response

- Status Code: 200 OK
- Content: JSON object representing the populated shopping cart.
  Example:
  ```json
  {
    "user": "user_id",
    "cartItems": [
      {
        "product": {
          "name": "Product A",
          "price": 19.99
        },
        "quantity": 2
      },
      {
        "product": {
          "name": "Product B",
          "price": 9.99
        },
        "quantity": 1
      }
    ]
  }
  ```

## Add or Update Cart Item

### Endpoint

`POST /carts/items`

### Description

Adds a new cart item or updates an existing cart item for a user's shopping cart.

### Request Body

- `userId` (required): The ID of the user.
- `productId` (required): The ID of the product to add or update in the cart.
- `quantity` (required): The quantity of the product to add or update in the cart.

### Response

- Status Code: 200 OK
- Content: JSON object representing the updated shopping cart.

## Delete Cart Item

### Endpoint

`DELETE /carts/items/:id`

### Description

Deletes a cart item from a user's shopping cart.

### Parameters

- `id` (required): The ID of the product to delete from the cart.

### Request Body

- `userId` (required): The ID of the user.

### Response

- Status Code: 200 OK
- Content: JSON object with a success message.
  Example:
  ```json
  {
    "message": "Cart Item deleted successfully!"
  }
  ```

## Update Cart Item Quantity

### Endpoint

`PATCH /carts/items/:id`

### Description

Updates the quantity of a cart item in a user's shopping cart.

### Parameters

- `id` (required): The ID of the product to update in the cart.

### Request Body

- `userId` (required): The ID of the user.
- `quantity` (required): The new quantity of the product in the cart.

### Response

- Status Code: 200 OK
- Content: JSON object representing the updated shopping cart.

# Order Service

This document provides details about the API endpoints for managing orders in the system.

## Base URL

The base URL for all endpoints is `/api/orders`.

## Create a New Order

**Endpoint:** `POST /api/orders`

**Request Body:**

```json
{
  "customer": "CustomerID",
  "paymentMethod": "Payment Method",
  "address": "Shipping Address"
}
```

**Response:**

- `200 OK`: Order created successfully. Returns the newly created order object.
- `400 Bad Request`: If some fields are missing in the request body.
- `500 Internal Server Error`: If something went wrong during order creation.

## Get All Orders

**Endpoint:** `GET /api/orders`

**Response:**

- `200 OK`: Returns an array of all orders in the system.
- `500 Internal Server Error`: If something went wrong during the retrieval.

## Get Order by ID

**Endpoint:** `GET /api/orders/:id`

**Response:**

- `200 OK`: Returns the order with the specified `id`.
- `400 Bad Request`: If the `id` parameter is missing.
- `500 Internal Server Error`: If something went wrong during the retrieval.

## Get All Orders for a Customer

**Endpoint:** `GET /api/orders/customers/:customerId`

**Response:**

- `200 OK`: Returns an array of all orders for the specified `customerId`.
- `400 Bad Request`: If the `customerId` parameter is missing.
- `500 Internal Server Error`: If something went wrong during the retrieval.

## Get Order for a Customer by Order ID

**Endpoint:** `GET /api/orders/:id/customers/:customerId`

**Response:**

- `200 OK`: Returns the order with the specified `id` for the given `customerId`.
- `400 Bad Request`: If either `id` or `customerId` parameters are missing.
- `500 Internal Server Error`: If something went wrong during the retrieval.

## Delete an Order

**Endpoint:** `DELETE /api/orders/:id`

**Response:**

- `200 OK`: Order deleted successfully.
- `400 Bad Request`: If the `id` parameter is missing.
- `500 Internal Server Error`: If something went wrong during the deletion.

## Get Order by Tracking Number

**Endpoint:** `GET /api/orders/trackingNumber/:number`

**Response:**

- `200 OK`: Returns the order with the specified `number`.
- `400 Bad Request`: If the `number` parameter is missing.
- `500 Internal Server Error`: If something went wrong during the retrieval.

## Update Order Status by Tracking Number

**Endpoint:** `PATCH /api/orders/trackingNumber/:number`

**Request Body:**

```json
{
  "status": "New Status"
}
```

**Response:**

- `200 OK`: Order status updated successfully. Returns the updated order object.
- `400 Bad Request`: If either `number` or `status` parameters are missing.
- `500 Internal Server Error`: If something went wrong during the update.

## Error Responses

- `500 Internal Server Error`: This response is returned when an unexpected error occurs on the server.
