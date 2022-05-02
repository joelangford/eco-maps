# Eco Maps
A little map site with a simple login and dashboard. Showing some bikes moving around routes and charging stations in Reading.

## live demo
https://ecomaps.joelangford.com/

## Demo users

* joe/test
* homer/test
* mac/test

## local setup

Clone the repo and navigate into the project locally using your shell.

```npm install```

```touch .env```

popuplate .env with your google maps API key, will need to not be restricted for local use and include the 'directions' service.

```
GMAPS_API_KEY="YOURGMAPSAPIKEYHERE"
```

Run from the comand line with:
```npm run start```

Then visit this url in your web browser:
```localhost:8080```

## Possible improvements

* Backend API to make users eccryped and actually secure
* Better routing
* css pre processor to better organise styles (e.g. sass)
* Proper logout
* optimise assets e.g. lazyload video