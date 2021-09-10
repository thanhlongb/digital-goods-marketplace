# Frontend App

Before getting started, for login function to work, you must setup the Cognito credentials which can be found in `.env.local.sample` file. Contact @thanhlongb for Cognito credentials. 

If you **don't care about login function** then just skip the above message. 

To run this app, you need to create an docker image first:

```
docker build -t thanhlongb/digitalmarket .
```

Then, run the following command to run the server:

```
docker-compose up -d
```

If everything work correctly, you should be able to run use at app at: [http://localhost:3000](http://localhost:3000)
