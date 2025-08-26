from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from models import Task  # імпорт моделі з models.py

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def add_task():
    task = await Task.create(title="Test task")
    return {"message": "Task added", "task_id": task.id}

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["models"]},  # вказуємо справжній файл
    generate_schemas=True,
    add_exception_handlers=True,
)
