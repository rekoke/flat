from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import json

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
    return max(product.product_id for product in items) + 1

class Product(BaseModel):
    product_id: int = Field(default_factory=_find_next_id, alias="id")
    name: str
    price: float
    is_fav: bool = None

items = [
    Product(id=1, name="Product name 1", price=111),
    Product(id=2, name="Product name 2", price=222),
    Product(id=3, name="Product name 3", price=333),
    Product(id=4, name="Product name 4", price=444),
]


@app.get("/products")
async def get_products():
    return items

@app.post("/products", status_code=201)
async def add_product(product: Product):
    items.append(product)
    return items
