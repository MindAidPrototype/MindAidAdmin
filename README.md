# [MindAidAdmin](https://mindaidadmin.herokuapp.com)

Ensure when developing to make regular commits and to regularly check the repo for any pull requests

### What?

#### A site for editing the materials on MindAid

This site will act as an api for the main Mind Aid site,
The front end will replicate the main site, but will have the ability to edit the content,

### Why?

The content for the main site will be constantly changing and we would like a way for a non technical admin to configure it easily

### How?

The site will resemble the main site, but the content will be configurable and the changes will be saved in our database

### Quick start

Ensure you have [node](https://nodejs.org/en/download/) and [mongo](https://docs.mongodb.com/manual/installation/) installed on your computer

Clone the repo, install the dependencies, start the node server, start mongo, visit localhost. Do this with:

`git clone https://github.com/MindAidPrototype/MindAidAdmin && cd MindAidAdmin && npm i && npm start`

In a seperate tab run:

`mongod`

Visit `http://localhost:4000`

### More information

Check out our wiki for information on the layout of each page and our data structure
