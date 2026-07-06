📰 The Daily AI

A machine learning app that classifies news headlines into **World, Sports, Business, or Sci/Tech** using a fine-tuned DistilBERT model — wrapped in a newspaper-themed React frontend.

---

## 🧠 Model

- **Architecture:** DistilBERT (`distilbert-base-uncased`) fine-tuned for sequence classification
- **Dataset:** AG News (fancyzhx/ag_news) — 4 categories, 120k samples
- **Training:** 3 epochs, batch size 8
- **Accuracy:** 90.6% on evaluation set
- **Framework:** Hugging Face Transformers + PyTorch

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Model | DistilBERT (Hugging Face Transformers) |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Vite |
| Testing | Pytest + FastAPI TestClient |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1       # Windows
source venv/bin/activate           # Mac/Linux
pip install transformers datasets torch fastapi uvicorn accelerate evaluate scikit-learn
```

### Train the Model
```bash
python train.py
```
Training takes ~30 minutes on CPU. Model is saved to `backend/saved_model/` when complete.

### Start the Backend
```bash
python -m uvicorn app:app --reload
```
API runs at `http://localhost:8000`  
Interactive API docs at `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`

---

## 🧪 Running Tests

```bash
cd backend
python -m pytest test_app.py -v
```

16 tests covering:
- Health check
- Valid label output
- Confidence score validation
- All 4 category scores
- Edge cases: emojis, special characters, XSS injection, very long text, empty input
- Expected category classification for all 4 labels

---

## 📁 Project Structure
The-Daily-AI/
├── backend/
│   ├── app.py          # FastAPI server
│   ├── train.py        # Model training script
│   ├── test_app.py     # Pytest test suite
│   └── saved_model/    # Trained model weights (not in repo)
└── frontend/
├── src/
│   └── App.jsx     # React UI
├── package.json
└── index.html

---

## 🔌 API

### `POST /classify`
Classifies a news headline into one of 4 categories.

**Request:**
```json
{
  "text": "NASA launches new Mars rover mission"
}
```

**Response:**
```json
{
  "label": "Sci/Tech",
  "confidence": 94.2,
  "all_scores": {
    "World": 1.3,
    "Sports": 2.1,
    "Business": 2.4,
    "Sci/Tech": 94.2
  }
}
```

---

## 📊 Test Headlines

| Headline | Expected |
|---|---|
| "NASA discovers water on Mars" | Sci/Tech |
| "Federer wins Wimbledon final" | Sports |
| "Federal Reserve cuts interest rates" | Business |
| "UN Security Council votes on ceasefire" | World |

---

## 📌 Notes

- The `saved_model/` folder is excluded from the repo — run `train.py` to generate it locally
- Model truncates input at 128 tokens
- Trained on English text only; non-English input will produce unreliable results
