from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/home")
async def home():
    return {"message": "Home Page"}

@app.get("/about")
async def about():
    return {"message": "About Page"}