# hoopla-movie-thumbnails

browse through the thumbnails of Hoopla movie titles.  also supports pagination and reflects the current page as a "page" querystring parameter.  when loading a new page of thumbnails, it waits for both the api request to finish fetching as well as all the images on the page to finish loading before hiding the "loading..." spinner.  also caches pages that have already been loaded.

## first...
npm install

## then...

### Development
npm start

### Production
npm run build

npm run prod


...or you can view it live here
https://pacific-ridge-55762.herokuapp.com/

![screen shot 2017-11-25 at 10 20 06 am](https://user-images.githubusercontent.com/11671559/33233388-56bdfac0-d1ca-11e7-8ee6-ae4230e85092.png)
