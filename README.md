# minimal-angular2-webpack-seed
A minimal angular2 project using webpack. NOTE: I would be very thankfull if you gave me some comments on things that could be done better. 

In windows you will need to :

1. to install node. Set the class path so that you find it in the cmd

2. install git. set the class path so that you find it in the cmd

thats all

Get the code on you computer. 

Move to the root of the folder and type npm install

in the package.json you will find some scripts that you can run. 

1. type npm run start-server. your express server will run on port 3030. 
2. open a new terminal window at the same location. type either npm run build-dev for one time dev build. Or type npm run start-dev. It will now build when you change your files. 
3. type http://localhost:3030/#/ in your browser. The app should be up and running. 

# Production build
Stop the dev build if its in a watch mode. Select terminal window and press Ctrl-C. Type Y to stop

Stop the server in its terminal by typing Ctrl-C 

Open the file server.js. Change folder (at two places) from 'dev' to 'web'. Restart the server

type npm run build-prod. your prod build should show in the browser

In the prod build the js and css files are minimied and they have a chunk in the name so you wont get any caching problems when installilng new versions in prod. In the file 'webpack-production.config.js' you can see other 'goodies' thats done. 

NOTE: I would be very thankfull if you gave me some comments on things that could be done better. 
# user-insight
