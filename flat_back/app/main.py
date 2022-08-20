from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:4000/products"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _find_next_id():
    if items:
        return max(product.product_id for product in items) + 1
    return 1

class Product(BaseModel):
    product_id: int = Field(default_factory=_find_next_id, alias="id")
    name: str
    price: float
    is_fav: bool = None

items = [
    Product(id=1, name="Product name 1", price=111, is_fav=False),
    Product(id=2, name="Product name 2", price=222, is_fav=False),
    Product(id=3, name="Product name 3", price=333, is_fav=False),
    Product(id=4, name="Product name 4", price=444, is_fav=False),
]


@app.get("/products")
async def get_products():
    return items

@app.post("/products", status_code=201)
async def add_product(product: Product):
    items.append(product)
    return items

@app.delete("/products/{id}")
async def delete_book(id: int):
    book_to_remove = find_product(id)

    if book_to_remove is not None:
        items.remove(book_to_remove)
        return items


def find_product(id):
    for item in items:
        if item.product_id == id:
            return item
    return None