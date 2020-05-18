"use strict";

const functions = require("firebase-functions");
const { dialogflow, HtmlResponse } = require("actions-on-google");
const BinCollection = require("./util/binCollection.js");

const BINCOLLECTION = new BinCollection();
const app = dialogflow({ debug: true });

const URL = "<insert your hosting url>"

async function checkBin(conv) {
  if (conv.user.verification === "VERIFIED") {
    if (conv.user.storage.collection) {
      if (!BINCOLLECTION.is_setup()) {
        BINCOLLECTION.set_location(conv.user.storage.collection.location);
      }
      if (!BINCOLLECTION.is_update()) {
        let data = await BINCOLLECTION.pull_data();
        conv.user.storage.collection.data = data;
        conv.user.storage.collection.lastUpdate = 0; //update with the current time
      }
    }
  }
}

app.intent("Fallback", (conv) => {
  conv.ask(`I don’t understand. Try asking about collection!`);
  conv.ask(new HtmlResponse());
});

app.intent("Clear", (conv, { what }) => {
  if (what === "collection") {
    conv.user.storage.collection = {};
    BINCOLLECTION.clear()
  }
  conv.ask("All cleared out");
  conv.ask(
    new HtmlResponse({
      url: URL,
      data: {
        state: "COLLECTION_SETUP",
      },
    })
  );
});

app.intent("Collection search", async (conv, { name }) => {
  const result = await BINCOLLECTION.search_address(name);
  conv.ask(
    new HtmlResponse({
      url: URL,
      data: {
        state: "COLLECTION_SETUP",
        address: result,
      },
    })
  );
});

app.intent("Collection setup", async (conv, { location }) => {
  //Lets make sure it is an integer
  if (Number.isInteger(parseInt(location))) {
    //Setup the base of the storage
    conv.user.storage.collection = {
      location: location,
      data: null,
      lastUpdate: 0,
    };

    //Request a pull
    await checkBin(conv);
    conv.ask(
      new HtmlResponse({
        url: URL,
        data: {
          state: "COLLECTION",
          dates: conv.user.storage.collection.data,
        },
      })
    );
  } else {
    conv.ask(`Location was not valid, please try again`);

    conv.ask(
      new HtmlResponse({
        url: URL,
        data: {
          state: "COLLECTION_SETUP",
        },
      })
    );
  }
});

function date_diff_indays(date1, date2) {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

function check_collection(conv) {
  let tomorrowService = [];
  let todayService = [];
  let data = conv.user.storage.collection.data;
  let today = new Date();
  Object.keys(data).map((d, i) => {
    let next = new Date(data[d].next);
    let diff_dates = date_diff_indays(today, next);
    if (diff_dates === 1) {
      tomorrowService.push(d);
    } else if (diff_dates === 0) {
      todayService.push(d);
    }
  });

  let text = "";
  if (tomorrowService.length > 0) {
    text = "Tomorrow is collecting: ";
    tomorrowService.map((item) => {
      text += item + ",";
    });
  }

  if (todayService.length > 0) {
    text = "Today is collecting: ";
    todayService.map((item) => {
      text += item + ",";
    });
  }
  if (text.length > 0) conv.ask(text); //Must have a text otherwise google throws an error
}

async function collection(conv) {
  if (conv.user.verification === "VERIFIED") {
    let data = conv.user.storage.collection;
    if (data && data.location) {
      await checkBin(conv);
      conv.ask(`Here are the dates of rubbish collection`);

      check_collection(conv);

      conv.ask(
          new HtmlResponse({
            url: URL,
            data: {
              state: "COLLECTION",
              dates: conv.user.storage.collection.data,
            },
          })
      );
    } else {
      conv.ask(`Please setup your location first`);
      conv.ask(
          new HtmlResponse({
            url: URL,
            data: {
              state: "COLLECTION_SETUP",
            },
          })
      );
    }
  }
}

app.intent("Collection", async (conv) => {
  await collection(conv)
});

app.intent("Welcome", async (conv) => {
  await collection(conv);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
/* if (!conv.surface.capabilities
    .has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
      conv.ask('Sorry, this device does not support audio playback.');
      conv.ask('Which response would you like to see next?');
      return;
  }
*/
