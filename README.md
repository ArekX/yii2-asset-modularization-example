# yii2-asset-modularization-example

Example for Yii 2 asset modularization

# Testing the example

In order to test the example you will need nodejs 8+ and composer installed on the computer you are testingo on.

To install and run this example download this code and then run:

1. `npm ci`
2. `composer install`
3. `npm run build`
4. `./yii test` - This will start the test server.

After this is running you will be able to access the site on http://localhost:8080

# Notes

* All apps "global" SCSS files are supposed to be in `scss` folder.
* All apps "global" JS files are supposed to be in `js` folder.
* Checkout `frontend/views/site/index.php` to see example of using the modularized approach to views.
* All bundles which are overridden are listed in `frontend/config/bundle_remaps.php`
* To watch for changes and rebuild automatically run `npm start`
* To run `minified` version of the build run `npm run deploy`
* All minified assets are in `frontend/web/build`