# most-web-vash
Most Web Framework Vash View Engine

![MOST Web Framework Logo](https://www.themost.io/assets/images/most_logo_sw_240.png)

A view engine for [vash](https://github.com/kirbysayshi/vash) templates which are going to be used in web applications based on [MOST Web Framework](https://github.com/kbarbounakis/most-web)

## Install

$ npm install most-web-vash

## Usage

Register view engine by adding the following node in config/app.json engines collection:

    "engines": [
        ...
        {
            "name": "Vash View Engine", "extension": "vash", "type": "most-web-vash"
        }
        ...
        ]
    }

Create a new controller (app/controllers/example-controller.js):

    var web = require("most-web"), util = require("util");

    function ExampleController() {
        ExampleController.super_.call(this);
    }

    util.inherits(ExampleController, web.controllers.HttpBaseController);

    ExampleController.prototype.hello = function(callback) {
        return callback(null, this.result({ name:"Thomas" }));
    }

Create a jade template:

    <h2>This a Vash example</h2>
    <p>Hello @model.data.name!</p>

Place it in views folder:

    app
        + views
            + example
                hello.html.vash

and finally execute the action /example/hello.html