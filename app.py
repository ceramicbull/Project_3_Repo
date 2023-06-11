import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
from us_state_abbrev import abbrev_to_us_state as un_abbrev

from flask import Flask, jsonify, render_template


#################################################
# Database Setup 
#################################################
engine = create_engine("sqlite:///ufo.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to the tables
Ufos = Base.classes.ufo_sightings
geo = Base.classes.state_geo

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

@app.route("/api/v1.0/plot")
def plot():
    
    # Open session
    session = Session(engine)
    
    # Query all states and dates
    state_query = session.query(Ufos.state, Ufos.date_time).all()

    # close session
    session.close()

    # Create count per state per year
    state_dates_frequency = {}

    for result in state_query:
        state = result[0]
        dates = result[1].year

        if state in state_dates_frequency:
            if dates in state_dates_frequency[state]:
                state_dates_frequency[state][dates] += 1
            else:
                state_dates_frequency[state][dates] = 1
        else:
            state_dates_frequency[state] = {}
    
    return jsonify(state_dates_frequency)

@app.route("/api/v1.0/map_info")
def map_info():
     # Open session
    session = Session(engine)

    #queries
    state_info=session.query(geo.state,geo.population,geo.geometry).all()
    

    #geoJson dictionary
    #inital setup
    geoJson={"type":"FeatureCollection",
             "features":[]}
    #loop through states
    for i in range(len(state_info)):
        #unravel tuples
        info=list(np.ravel(state_info[i]))
        #ignore Puerto Rico (sorry)
        if info[0] != "PR":
            #count sightings in the state of this paricular row
            sightings=session.query(Ufos).filter(Ufos.state==info[0]).count()
            #(almost) blank dictionary for the feature
            feature_dict={"type":"Feature",
                            "properties":{}}
            #iterate id number
            feature_dict["id"]=i+1
            #target the properties sub-dictionary for simpler code
            properties=feature_dict["properties"]
            #get the name
            properties["name"]=info[0]
            #get the proper name of the state
            properties["proper_name"]=un_abbrev[info[0]]
            #get population
            properties["population"]=info[1]
            #get raw number of sightings
            properties["sightings"]=session.query(Ufos).filter(Ufos.state==info[0]).count()
            #calculate per-capita sightings
            properties["per_capita"]=sightings/int(info[1])
            #pull out the geometry info
            properties["geometry"]=eval(info[2])
            #add the properties of the feature to the geoJson
            geoJson["features"].append(feature_dict)
    
    
    # close session
    session.close()

    return jsonify(geoJson)
    


@app.route("/api/v1.0/shapes")
def shapes():

    # Open session
    session = Session(engine)

    # Query unique shapes
    query_results = session.query(
        Ufos.state, Ufos.shape).all()

    state_shapes_frequency = {}

    for result in query_results:
        state = result[0]
        shape = result[1].lower() if result[1] != "" else "unreported"

        if state in state_shapes_frequency:
            if shape in state_shapes_frequency[state]:
                state_shapes_frequency[state][shape] += 1
            else:
                state_shapes_frequency[state][shape] = 1
        else:
            state_shapes_frequency[state] = {}

    # close session
    session.close()

    # Convert list of tuples into normal list
    #shape_results = list(np.ravel(results))

    return jsonify(state_shapes_frequency)

if __name__ == '__main__':
    app.run(debug=False)
