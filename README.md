﻿# **nba-team-wins-2019**

Note: with the 2019 season over with, the app won't update with new data at this moment as the site it scraped from has changed.

## **Application**
This is a live webscraping application which can be found here:  [http://nba-wins-scraper.herokuapp.com/](http://nba-wins-scraper.herokuapp.com/)

## **About the App**
This app was created to track NBA team wins for a competition between four individuals who "drafted" a group of NBA teams.  The winner of the competition would have the most combined wins for teams they drafted.  As wins would change daily, this app was created as an easy way to track progress real time.

## **Technical Notes**
The web scraping is done using Pandas to extract tables from cbssports.com.  The flask route pulls the data down from the website when the user of the webpage asks the app to scrape live data.  Eastern conference and western conference tables are pulled separately, and then combined.  Then each owner is aligned with their team.  Data is saved in a SQLite database, which the app will reference to create visualizations using Plotly.  
