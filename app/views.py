from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
    #return render_template('script.js')
    #return render_template('style.css')
