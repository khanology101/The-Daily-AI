from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

#Allow React Frontend to access this server

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"] # Allows all origins
)

#Load Saved Model and Tokenizer

tokenizer = AutoTokenizer.from_pretrained("./saved_model")
model = AutoModelForSequenceClassification.from_pretrained("./saved_model")
model.eval()  # Set the model to evaluation mode

LABELS = ["World", "Sports", "Business", "Sci/Tech"]

class TextInput(BaseModel):
    text: str

@app.post("/classify")
def classify_text(input_text: TextInput):
    inputs = tokenizer(input_text.text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=1)[0]   
    predicted = torch.argmax(probs).item()
    return{
        "label": LABELS[predicted],
        "confidence": round(probs[predicted].item()*100, 2),
        "all_scores": {LABELS[i]: round(probs[i].item()*100, 2) for i in range(4)}
    }

@app.get("/")
def root():
    return {"status": "API is running"}