from flask import Flask, render_template, request
from culture import culture
app = Flask(__name__)

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/culture', methods=['GET', 'POST'])
def culture_season():
   if request.method == 'POST':
      culture_type = request.form['culture']
      season_type = request.form['season']
      return culture(culture_type, season_type)

   else:
      return render_template('index.html')

if __name__ == '__main__':
   app.run(debug=True)