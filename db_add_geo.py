import csv
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Define the SQLite database file path
database_file = 'ufo.sqlite'

# Create the SQLAlchemy engine
engine = create_engine(f'sqlite:///{database_file}', echo=True)

# Create a base class for declarative models
Base = declarative_base()

# Define the model for the table


class StateGeo(Base):
    __tablename__ = 'state_geo'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    state = Column(String)
    population = Column(Integer)
    geometry = Column(String)


# Create the table in the database
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# commented out to prevent database from being recreated/filled on each run
# Iterate over each csv file in folder
with open('Data/pop_and_geo/GEOMETRY.csv', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    # skip header row
    next(csv_reader)
    for csv_row in csv_reader:
        state, population, geometry = csv_row
        db_row = StateGeo(state=state, population=population, geometry=geometry)
        session.add(db_row)

session.commit()

session.close()
