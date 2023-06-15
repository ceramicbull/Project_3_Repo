# A Decade of UFO Sightings in the United States

## Introduction
This project looks at sightings of unidentified flying objects (UFOs) reported by the general public on the [National UFO Reporting Center](https://nuforc.org/) website. After reviewing the available data it was decided to highlight the last 10 years of data for this project to illustrate a recent overview of the data and allow for a more manageable dataset. The aim of this project is to create an interactive webpage that allows users to select a state and instantly interpret the physical location, per capita adjusted amount of sightings for the location, the overall reported shapes of the UFOs as well as the UFO sightings and reporting trends over time for the specified state.

## Webscraping
The website was [scraped using Python](https://github.com/ceramicbull/Project_3_Repo/blob/main/Data/webscrape.ipynb), the dataset was cleaned and a [CSV file](https://github.com/ceramicbull/Project_3_Repo/tree/main/Data/output_csv) was created with the desired data. 

## DataBase Creation
A [SQLite database was created](https://github.com/ceramicbull/Project_3_Repo/blob/main/db_setup.py) using the cleaned CSV file.

## Flask API Set Up
The Python Flask API was set up in the [app.py file](https://github.com/ceramicbull/Project_3_Repo/blob/main/app.py) and routes were added as needed during the development of the project. 

## Webpage
The webpage layout and styling can be reviewed in the [index.html](https://github.com/ceramicbull/Project_3_Repo/blob/main/templates/index.html) file. The styling was augmented with the React JavaScript library.

## Interactive Maps & Plots
Two [Leaflet choropleth maps](https://github.com/ceramicbull/Project_3_Repo/blob/main/static/js/plots.js) were created along with two [Plotly graphs](https://github.com/ceramicbull/Project_3_Repo/blob/main/static/js/plots.js) to visualize the data set. 

## Conclusion
This project required a comprehensive skillset of data analytics and web development to create an interactive webpage that allows any user to quickly and easily analyze data. Main takeaways from the interactive data show: 
- States with higher populations show higher numbers of sightings
- Per capita adjusted sightings show the majority of sightings take place in the western United States with a small pocket in the northeast
- By far the most reported shape for almost all states is 'light' 
- Reportings of sightings on this website have trended slightly downward with a noticeable peak in 2014 and a second peak in 2020 

## Resources
[National UFO Reporting Center](https://nuforc.org/)  
[National UFO Reporting Center Online Database](https://nuforc.org/databank/)  
[United States of America Python Dictionary](https://gist.github.com/rogerallen/1583593)  
[Population Estimates API](https://www.census.gov/data/developers/data-sets/popest-popproj/popest.html)  
[Slide Deck](https://docs.google.com/presentation/d/1HZREObr04ZEqqgNdZNPVDqCBwjlN3rXxUnYY-yO7xj4/edit#slide=id.p1)

## Contributors
[Benjamin Chilcoat](https://github.com/ceramicbull)  
[Chelsea Pickett](https://github.com/chelseapickett)  
[Kyara Martinez](https://github.com/martinezzkyara)  
[Leigha Russel](https://github.com/lrussell834)

## Index
[HTML/CSS/JavaScript/React](https://github.com/ceramicbull/Project_3_Repo/blob/main/templates/index.html)  
[Leaflet maps & Plotly charts](https://github.com/ceramicbull/Project_3_Repo/blob/main/static/js/plots.js)  
[Python Flask API](https://github.com/ceramicbull/Project_3_Repo/blob/main/app.py)  
[SQLite Database](https://github.com/ceramicbull/Project_3_Repo/blob/main/db_setup.py)  
[Web scraping](https://github.com/ceramicbull/Project_3_Repo/blob/main/Data/webscrape.ipynb)



