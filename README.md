## midjourney-clone
a midjourney clone using openAI  AI image generation

![screenshot](https://github.com/Nadzt/midjourney-clone/blob/main/images/screenshot.png)

### what you will need to run this app:
1. create an OPEN AI account then create a secret api key [here](https://platform.openai.com/account/api-keys)
2. create a mongodb account, create a cluster, and get the connection string
3. create a cloudinary account, get a secret KEY and it's secret

### how to clone this repository:
cd into the folder you want to copy this repo
clone it:

    git clone https://github.com/Nadzt/midjourney-clone.git
cd into the client folder and install the dependencies:

    cd client/
    npm i
now go back, cd into the server and install the dependencies there:

    cd ../server/
    npm i
now, with a code editor go into the server file, create a ".env" file and fill this:

    OPENAI_API_KEY=""
    MONGODB_URL=""
    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
now you're ready, start the server with one terminal by going into the server folder and then running "npm start"

    cd server/
    npm start
if this doesnt work, you might need to install nodemon, if you do not wish to do so, in the server/package.json 
file change "start": "nodemon index" for "start": "index"

with ANOTHER terminal, go into the client folder and start the client with "npm run dev":

    cd client/
    npm run dev
done, go to the link displayed on your terminal!
