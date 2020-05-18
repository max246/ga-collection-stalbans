"use strict";
const fetch = require("node-fetch");

module.exports = class BinCollection {
  constructor() {
    this.url =
      "https://gis.stalbans.gov.uk/NoticeBoard8/VeoliaProxy.NoticeBoard.asmx/GetServicesByUprnAndNoticeBoard";
    this.clear();
  }

  is_setup() {
    if (this.location === null) return false;
    else return true;
  }
  is_update() {
    //check last time we pulled it
    return false;
  }

  set_location(location) {
    this.location = location;
  }

  clear() {
    this.food_last = null;
    this.food_next = null;
    this.green_last = null;
    this.green_next = null;
    this.domestic_last = null;
    this.domestic_next = null;
    this.recycle_last = null;
    this.recycle_next = null;
    this.location = null;
  }

  parse_date(text) {
    let pDate = new Date(Date.parse(text));
    return pDate;
  }

  parse_data(data) {
    if (data["TaskType"].indexOf("Food") >= 0) {
      this.food_last = this.parse_date(data["Last"]);
      this.food_next = this.parse_date(data["Next"]);
    } else if (data["TaskType"].indexOf("Green") >= 0) {
      this.green_last = this.parse_date(data["Last"]);
      this.green_next = this.parse_date(data["Next"]);
    } else if (data["TaskType"].indexOf("Refuse") >= 0) {
      this.domestic_last = this.parse_date(data["Last"]);
      this.domestic_next = this.parse_date(data["Next"]);
    } else if (data["TaskType"].indexOf("Recycling") >= 0) {
      this.recycle_last = this.parse_date(data["Last"]);
      this.recycle_next = this.parse_date(data["Next"]);
    }
  }

  async search_address(address) {
    let search = [];
    let data = {
      search: "Select your address",
      filter: address,
      startIndex: 0,
      endIndex: 3,
    };

    let response = await fetch(
      "https://gis.stalbans.gov.uk/NoticeBoard8/quicksearch.asmx/GetMoreResults",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }
    );
    if (response.status === 200) {
      let result = await response.json();
      result["d"]["Data"].map((item) => {
        search.push({
          address: item["Columns"][0]["Value"],
          uprn: item["Columns"][3]["Value"],
        });
      });
    }
    return search;
  }

  async pull_data() {
    if (this.location === null) return null; //Do nothing if no location was given

    const body = { uprn: this.location, noticeBoard: "default" };
    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });


    if (response.status === 200) {
      let result = await response.json();

      let items = result["d"];
      items.map((item) => {
        item["ServiceHeaders"].map((service) => {
          this.parse_data(service);
        });
      });
      this.print_data();
      return this.prepare_data();
    }
  }



  print_data() {
    console.log(
      "Food, next: " +
        new Date(this.food_next) +
        ", last:" +
        new Date(this.food_last)
    );
    console.log(
      "Recycle, next: " +
        new Date(this.recycle_next) +
        ", last:" +
        new Date(this.recycle_last)
    );
    console.log(
      "Green, next: " +
        new Date(this.green_next) +
        ", last:" +
        new Date(this.green_last)
    );
    console.log(
      "Domestic, next: " +
        new Date(this.domestic_next) +
        ", last:" +
        new Date(this.domestic_last)
    );
  }

  prepare_data() {
    return {
      food: {
        next: this.food_next,
        last: this.food_last,
      },
      recycle: {
        next: this.recycle_next,
        last: this.recycle_last,
      },
      green: {
        next: this.green_next,
        last: this.green_last,
      },
      domestic: {
        next: this.domestic_next,
        last: this.domestic_last,
      },
    };
  }


};
