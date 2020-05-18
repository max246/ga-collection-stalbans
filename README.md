# Google Assistant Collection St Albans
Google action that can be invoke from your Google device to display the next Recycling and Refuse collection for St Albans.

![alt text](https://github.com/max246/ga-collection-stalbans/blob/master/img/home.png?raw=true)



##Setup Google Actions
1) Go to https://console.actions.google.com/
2) Create a new project ( I used ga-collection-stalbans ) 
3) Select Games & Fun ( at the moment is the only type that allows interactive canvas)
3) Select type of Conversational
4) Decide the invoke key
5) Go to Deploy and enable Interactive Canvas
5) Add a new action, press Get Started and select Play Game

###### DialogFlow

1) Choose your agent's name ( I used ga-collection-stalbans )
2) Go under Setting and Export & Import
3) Restore the zip file actions.zip 

###### Firebase

1) Go to https://console.firebase.google.com/
2) Select your project
3) You have to change to Blaze plan due to external API call, but it wont charge you if you dont use too much, have a look at the pricing.
4) Go under Setting and copy your project ID
6) Run 
```shell
firebase login
```
5) Run 
```shell
firebase use <project id>
``` 

###### Dependency 

1) Run 
```shell
npm install 
```
in the root folder 
2) Run 
```shell
npm install
```
in the function folder
3) Run 
```shell
npm run build 
```
to build the website 
4) Run 
```shell
firebase deploy
```

###### Update links
1) Once you run firebase deploy, go back to firebase page ( https://console.firebase.google.com/ )
2) In functions, copy the link
2) Go back to https://dialogflow.cloud.google.com/
3) In Fulfillment, enable webook and input the url link
4) Copy the hosting url and update the variable URL in functions/index.js
5) Save and run deploy again

###### Test it
1) Open https://console.actions.google.com/ and go to test

# Screenshots

![alt text](https://github.com/max246/ga-collection-stalbans/blob/master/img/home.png?raw=true)
![alt text](https://github.com/max246/ga-collection-stalbans/blob/master/img/search.png?raw=true)
![alt text](https://github.com/max246/ga-collection-stalbans/blob/master/img/result.png?raw=true)



# Commands

###### Run server
```shell
npm start
```

###### Build website
```shell
npm run build 
```

###### Deploy 
```shell
firebase deploy
```


# Intents

###### Clear
Clear the user storage 

###### Collection
Invoke the main script to pull the new date from the API

###### Collection search
Search for the address and retrieve the UPRN code

###### Collection setup
Finalise the setup with the UPRN code

###### Fallback
Trigger whatever the action is not reconising the command

###### Welcome
Invoke the main script 
 


## ISSUES

You might get this error that is common due to npm not installing the developer package

```
HtmlResponse is not supported on this device..
```
To fix it, install 
```shell
npm install actions-on-google@preview 
```
Another fix is to make sure Interactive Canvas is enable in https://console.actions.google.com/


## TODO

- Cache data and dont pull each time


