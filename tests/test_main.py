import pytest
from fastapi.testclient import TestClient
import backend.main as main

client = TestClient(main.app)

@pytest.fixture(autouse=True)
def reset():
    # Reset in-memory storage before each test
    main.todos.clear()
    main.next_id = 1
    yield


def test_get_empty():
    res = client.get("/todos")
    assert res.status_code == 200
    assert res.json() == []


def test_create_todo():
    res = client.post("/todos", json={"title": "Learn React"})
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == 1
    assert data["title"] == "Learn React"
    assert data["completed"] is False


def test_update_todo_title_and_completed():
    r = client.post("/todos", json={"title": "Old"})
    todo = r.json()
    todo_id = todo["id"] if isinstance(todo, list) else todo["id"]

    res = client.put(f"/todos/{todo_id}", json={"title": "New", "completed": True})
    assert res.status_code == 200
    updated = res.json()
    assert updated["title"] == "New"
    assert updated["completed"] is True


def test_delete_todo():
    r = client.post("/todos", json={"title": "To Delete"})
    todo = r.json()
    todo_id = todo["id"]

    res = client.delete(f"/todos/{todo_id}")
    assert res.status_code == 200
    assert res.json()["detail"] == "Todo deleted"

    get = client.get("/todos")
    assert all(t["id"] != todo_id for t in get.json())


def test_update_nonexistent_returns_404():
    res = client.put("/todos/999", json={"title": "X"})
    assert res.status_code == 404


def test_post_empty_title_returns_422():
    res = client.post("/todos", json={"title": ""})
    assert res.status_code == 422


def test_put_empty_title_returns_400():
    r = client.post("/todos", json={"title": "Keep"})
    todo = r.json()
    todo_id = todo["id"]
    res = client.put(f"/todos/{todo_id}", json={"title": ""})
    assert res.status_code == 400
