# MouseKYC Admin Panel

This is the admin panel frontend of the MouseKYC product. To run, make sure you follow the setup instructions mousekyc-be (the backend server) and mousekyc-fe (the frontend server). Additionally, you should make sure to follow the integration flow from whatever ICO dashboard solution you use. You can run this in demo mode to view as a standalone and see if it works for you to evaluate it.

#### Installation For Production

To generate a production build of the MouseKYC admin panel, run the following commands:

```
npm install
npm run build
```
You can then serve with whichever static serve solution you like. A simple npm one is `npm serve -s`, but you may also use NGINX or Apache. Additionally, if you deploy this application to Heroku with the create-react-app buildpack, it will deploy and run immediately.


#### Installation For Development

Run the following commands to setup on localhost:

```
npm install
npm start
```

#### Logging In
You an set an application owner email the configuration of the backend. That user will be able to login without approving each other administrator that uses the application. Set this to whichever email you would like to use for login, then get started!
