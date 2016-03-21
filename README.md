# most-web-vash
Most Web Framework Vash View Engine

![MOST Web Framework Logo](https://www.themost.io/assets/images/most_logo_sw_240.png)

A view engine for vash templates which are going to be used in web applications based on [MOST Web Framework](https://github.com/kbarbounakis/most-web)

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
