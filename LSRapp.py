import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
import datetime as dt

from flask import Flask, jsonify, render_template


#################################################
# Database Setup 
#################################################
engine = create_engine("sqlite:///ufo.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Ufos = Base.classes.ufo_sightings

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
    return render_template('LSRindex.html')


@app.route("/api/v1.0/states")
def states():
    
    # Open session
    session = Session(engine)
    
    # Query all states 
    results = session.query(Ufos.state).distinct().all()

    # close session
    session.close()

      # Convert list of tuples into normal list
    all_states = list(np.ravel(results))

    return jsonify(all_states)

@app.route("/api/v1.0/plot/<state>")
def plot(state):
    
    # Open session
    session = Session(engine)
    
    # Query all states and dates
    results = session.query(Ufos.state, Ufos.date_time).filter(Ufos.state == state).\
    filter(func.date(Ufos.date_time) < (2014, 1, 1)).all()

    # close session
    session.close()

    # Convert into dictionary
    if results:
        all_dates = []
        for i in results:
            date_dict = {}
            date_dict['state'] = i.state
            date_dict['Timestamp'] = i.str(i.date_time)
            all_dates.append(date_dict)
    
    return jsonify(all_dates)

if __name__ == '__main__':
    app.run(debug=False)
