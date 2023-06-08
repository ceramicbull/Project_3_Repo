import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

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
    return render_template('index.html')


@app.route("/api/v1.0/states")
def states():
    
    # Open session
    session = Session(engine)
    
    # Query all states 
    results = session.query(Ufos.city).distinct().all()

    # close session
    session.close()

      # Convert list of tuples into normal list
    all_states = list(np.ravel(results))

    return jsonify(all_states)



if __name__ == '__main__':
    app.run(debug=False)
