from splinter import Browser
import time

import pandas as pd
import numpy as np
import json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from scipy import stats

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


# def init_browser():

#     executable_path = {"executable_path": "c:/chromedriver"}
#     return Browser("chrome", **executable_path, headless=False)

def scrape_all():

    print("in scrape function")
    # visit the site
    cbs_url = 'https://www.cbssports.com/nba/standings/'

    ## EASTERN CONFERENCE TABLE ##
    # scrape page into pandas table

    cbs_tables = pd.read_html(cbs_url)
    east_df = cbs_tables[0]

    # data cleaning
    east_df.columns = ['delete', 'Team' ,'Wins' ,'Losses' ,'Win Percentage' ,'Games Back' ,'PPG' ,'OPPG' ,
                   'Point Differential' ,'Home Record' ,'Road Record' ,'Div Record vs Opp' ,
                   'Conf Record vs Opp' ,'Streak' ,'Last 10 Gm' ,'Projected Wins' ,'Div Winner Projection' ,
                   'Post Projection']
    east_df = east_df.drop(columns='delete')

    # set index to team for later join
    east_df.set_index('Team', inplace=True)

    ## WESTERN CONFERENCE TABLE ##
    cbs_tables = pd.read_html(cbs_url)
    west_df = cbs_tables[1]

    # data cleaning

    west_df.columns = ['delete', 'Team' ,'Wins' ,'Losses' ,'Win Percentage' ,'Games Back' ,'PPG' ,'OPPG' ,
                   'Point Differential' ,'Home Record' ,'Road Record' ,'Div Record vs Opp' ,
                   'Conf Record vs Opp' ,'Streak' ,'Last 10 Gm' ,'Projected Wins' ,'Div Winner Projection' ,
                   'Post Projection']
    west_df = west_df.drop(columns='delete')
    
    # set index to team for later join
    west_df.set_index('Team', inplace=True)

    ## JOIN TO CONNFERENCE TABLES
    nba_df = pd.concat([east_df, west_df], axis=0, sort=False)

    # adding a wins for the last 10 games column
    last_10_wins = nba_df["Last 10 Gm"].str.split("-", n=1, expand=True)
    nba_df["Last 10 Gm Wins"] = last_10_wins[0]
    nba_df["Last 10 Gm Wins"] = nba_df["Last 10 Gm Wins"].astype('int64')

    ## GET OWNERS TEAM DATA ##
    owners_df = pd.DataFrame(
    {"Team": ['Philadelphia', 'Orlando', 'Chicago', 'Utah', 'San Antonio', 'Memphis', 'Golden St.', 'Miami', 'Toronto', 'Cleveland', 'L.A. Lakers', 'Houston', 'Minnesota', 'New Orleans', 'Indiana', 'Brooklyn', 'Denver', 'L.A. Clippers', 'Phoenix', 'Sacramento', 'Oklahoma City', 'Milwaukee', 'Boston', 'Washington', 'Detroit', 'Atlanta', 'Dallas', 'Portland', 'Charlotte', 'New York' ],
     "Owner": ['Adam', 'Adam', 'Adam', 'Adam', 'Adam', 'Adam', 'Adam', 'Joey', 'Joey', 'Joey', 'Joey', 'Joey', 'Joey', 'Joey', 'Johnny', 'Johnny', 'Johnny', 'Johnny', 'Johnny', 'Johnny', 'Johnny', 'Robert', 'Robert', 'Robert', 'Robert', 'Robert', 'Robert', 'Robert', 'Unowned', 'Unowned']
    })

    # add column for owner to the nba dataframe
    nba_df = pd.merge(nba_df, owners_df, how="inner", on="Team", sort=False)

    # remove any teams that are unowned
    nba_df = nba_df[nba_df["Owner"] != "Unowned"]

    # group by owners for totals
    nba_grouped_df = nba_df.groupby(nba_df["Owner"])
    nba_grouped_df = nba_grouped_df[["Wins", "Losses", "Point Differential", "Projected Wins", "Last 10 Gm Wins"]].sum().reset_index()


    # import dependencies
    from sqlalchemy import create_engine

    # connect to local database
    database_path = "nba_db.sqlite"
    engine = create_engine(f"sqlite:///{database_path}")

    # populate the database
    nba_grouped_df.to_sql(name='owners_summary', con=engine, if_exists='replace', index=True)

