import os
import csv
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime


# Define the SQLite database file path
database_file = 'ufo.sqlite'

# Create the SQLAlchemy engine
engine = create_engine(f'sqlite:///{database_file}', echo=True)

# Create a base class for declarative models
Base = declarative_base()

# Define the model for the table


class UfoSightings(Base):
    __tablename__ = 'ufo_sightings'
    id = Column(Integer, primary_key=True, autoincrement=True)
    date_time = Column(DateTime)
    city = Column(String)
    state = Column(String)
    shape = Column(String)
    duration = Column(String)
    summary = Column(String)
    link_to_event = Column(String)


# Create the table in the database
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# Folder path for CSV files
folder_path = 'Data/output_csv/'
# format date time string
datetime_format_string = '%Y-%m-%d %H:%M:%S'

# Iterate over each csv file in folder
for filename in os.listdir('Data/output_csv/'):
    state_csv = os.path.join(folder_path, filename)
    # sanity check
    # print(state_csv)
    with open(state_csv, encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        # skip header row
        next(csv_reader)
        for csv_row in csv_reader:
            _id, date_time, city, state, shape, duration, summary, link_to_event = csv_row
            db_row = UfoSightings(date_time=datetime.strptime(date_time, datetime_format_string), city=city, state=state, shape=shape,
                                  duration=duration, summary=summary, link_to_event=link_to_event)
            session.add(db_row)

session.commit()
# test query on database
test = session.query(UfoSightings).filter(UfoSightings.city == 'Phoenix').all()
for result in test:
    print(result.summary, result.link_to_event)


session.close()
