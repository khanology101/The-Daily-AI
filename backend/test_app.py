import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

# ── Basic functionality ──────────────────────────────────────

def test_health_check():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json() == {"status": "running"}

def test_classify_returns_valid_label():
    res = client.post("/classify", json={"text": "NASA launches new Mars rover"})
    assert res.status_code == 200
    data = res.json()
    assert data["label"] in ["World", "Sports", "Business", "Sci/Tech"]

def test_confidence_is_percentage():
    res = client.post("/classify", json={"text": "Stock market crashes overnight"})
    data = res.json()
    assert 0 <= data["confidence"] <= 100

def test_all_scores_sum_to_100():
    res = client.post("/classify", json={"text": "Champions League final this weekend"})
    data = res.json()
    total = sum(data["all_scores"].values())
    assert abs(total - 100) < 1  # allow tiny float rounding

def test_all_four_categories_present():
    res = client.post("/classify", json={"text": "Breaking news from around the world"})
    data = res.json()
    assert set(data["all_scores"].keys()) == {"World", "Sports", "Business", "Sci/Tech"}

# ── Edge cases ───────────────────────────────────────────────

def test_single_word():
    res = client.post("/classify", json={"text": "War"})
    assert res.status_code == 200

def test_special_characters():
    res = client.post("/classify", json={"text": "!@#$%^&*()"})
    assert res.status_code == 200

def test_emojis():
    res = client.post("/classify", json={"text": "🚀🌍⚽💰"})
    assert res.status_code == 200

def test_very_long_text():
    long_text = "NASA discovers water on Mars. " * 100
    res = client.post("/classify", json={"text": long_text})
    assert res.status_code == 200

def test_numbers_only():
    res = client.post("/classify", json={"text": "1234567890"})
    assert res.status_code == 200

def test_html_injection():
    res = client.post("/classify", json={"text": "<script>alert('xss')</script>"})
    assert res.status_code == 200  # should not crash

def test_empty_string():
    res = client.post("/classify", json={"text": ""})
    # Either 200 with a result or 422 validation error — both acceptable
    assert res.status_code in [200, 422]

# ── Expected category tests ──────────────────────────────────

@pytest.mark.parametrize("headline,expected", [
    ("NASA launches telescope into orbit", "Sci/Tech"),
    ("Manchester United wins Premier League", "Sports"),
    ("Federal Reserve raises interest rates", "Business"),
    ("UN Security Council holds emergency meeting", "World"),
])
def test_expected_categories(headline, expected):
    res = client.post("/classify", json={"text": headline})
    assert res.json()["label"] == expected