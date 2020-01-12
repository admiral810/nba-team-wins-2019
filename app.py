import pandas as pd
import json
import scrape_nba

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy



# Create an instance of Flask
app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nba_db.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/owners")
def getOwners():
    results = pd.read_sql(f"SELECT * FROM owners_summary ORDER BY Wins DESC", db.session.bind)
    # Return a list of the column names (sample names)
    results = results.to_json(orient='records')
    jsonresults = json.loads(results)
    return jsonify(jsonresults)

@app.route("/teams")
def getTeams():
    results = pd.read_sql(f"SELECT * FROM teams_summary ORDER BY Wins ASC", db.session.bind)
    # Return a list of the column names (sample names)
    results = results.to_json(orient='records')
    jsonresults = json.loads(results)
    return jsonify(jsonresults)

@app.route("/scrape")
def scrape():
    print("in app route")
    scrape_nba.scrape_all()
    # return "Scraping Successful!"
    return redirect("/")

if __name__ == "__main__":
    app.run()

