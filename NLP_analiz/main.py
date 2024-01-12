from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
import deepl
from nltk.corpus import movie_reviews
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
"""
nltk.download('movie_reviews')
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')"""
documents = [(list(movie_reviews.words(fileid)), category)
             for category in movie_reviews.categories()
             for fileid in movie_reviews.fileids(category)]

import random
random.shuffle(documents)
# Metni işleme için gereken fonksiyonlar
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
def preprocess_text(text):
    tokens = word_tokenize(text.lower())  # Metni küçük harfe dönüştürme ve tokenizasyon
    filtered_tokens = [lemmatizer.lemmatize(token) for token in tokens if token.isalnum() and token not in stop_words]  # Tokenler üzerinde lemmatizasyon ve stop words kontrolü
    return ' '.join(filtered_tokens)
text_data = [" ".join(review) for review, category in documents]
labels = [category for review, category in documents]
processed_data = [preprocess_text(text) for text in text_data]
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(processed_data)

X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.3, random_state=42)

# Modelin eğitimi
svm_model = LinearSVC()
svm_model.fit(X_train, y_train)
predictions = svm_model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model Doğruluğu: {accuracy * 100:.2f}%")

def aanalyze_sentiment(text):
    processed_text = preprocess_text(text)
    text_vector = vectorizer.transform([processed_text])
    prediction = svm_model.predict(text_vector)
    return prediction[0]

sample_text = "This movie is a good! But everyone says this is good."
sentiment = aanalyze_sentiment(sample_text)
print(f"Metin Duygusu: {sentiment}")
# Diğer kodları burada ekle, örneğin preprocess_text, analyze_sentiment vb.

app = Flask(__name__)
CORS(app)
@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    request_data = request.json
    sample_text = request_data['text']


    auth_key = "66b03095-2819-4f95-a08b-ea8b5ef118bc:fx"  # Replace with your key
    translator = deepl.Translator(auth_key)

    result = translator.translate_text(sample_text, target_lang="EN-US")
    print(result.text)
    sentiment = aanalyze_sentiment(result.text)
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
# See PyCharm help at https://www.jetbrains.com/help/pycharm/"""
