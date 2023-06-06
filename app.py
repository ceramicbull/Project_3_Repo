import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template


#################################################
# Database Setup (insert our sqlite file)
#################################################
engine = create_engine("sqlite:///data/titanic.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def main_page():
    """
    Render the main page of the webapp.
    """
    return render_template('index.html')


@app.route("/api/v1.0/")
def passengers_by_class():
    
    # Open session
    session = Session(engine)
    
    # Query 

    # close session
    session.close()


if __name__ == '__main__':
    app.run(debug=False)
