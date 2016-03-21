/**
 * MOST Web Framework
 * A JavaScript Web Framework
 * http://themost.io
 * Created by Kyriakos Barbounakis<k.barbounakis@gmail.com> on 2016-03-21.
 *
 * Copyright (c) 2014, Kyriakos Barbounakis k.barbounakis@gmail.com
 Anthi Oikonomou anthioikonomou@gmail.com
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of MOST Web Framework nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @ignore
 */
var vash = require('vash'),
    fs = require('fs');

/**
 * @class
 * Represents a view engine that may be used in MOST Web Framework applications.
 * @param {HttpContext|*} context
 * @constructor
 * @property {HttpContext|*} context
 */
function VashEngine(context) {
    var ctx = context;
    Object.defineProperty(this, 'context', {
        get: function () {
            return ctx;
        },
        set: function (value) {
            ctx = value;
        },
        configurable: false,
        enumerable: false
    });
}

/**
 * Renders the view by attaching the data specified if any
 * @param {string|Function} file A string that represents the physical path of the view or a function which returns the view path
 * @param {*} data Any data to be attached in the result
 * @param {function(Error=,string=)} callback A callback function to be called when rendering operation will be completed.
 */
VashEngine.prototype.render = function(file, data, callback) {
    callback = callback || function() {};
    var self = this;
    var physicalPath;
    try {
        //if first argument is a function
        if (typeof file === 'function') {
            //invoke this function and return the physical path of the target view
            physicalPath = file.call();
        }
        else if (typeof file === 'string') {
            //otherwise get physical
            physicalPath = file;
        }
        else {
            //or raise error for invalid type
            return callback(new TypeError('The target view path has an invalid type or is empty.'));
        }
        fs.readFile(physicalPath, 'utf8', function(err, source) {
            if (err) {
                return callback(err);
            }
            //render data
            try {
                var fn = vash.compile(source),
                    result = fn(data);
                return callback(null, result);
            }
            catch (e) {
                return callback(e);
            }
        });
    }
    catch(e) {
        return callback(e);
    }
};

if (typeof exports !== 'undefined')  {
    module.exports = {
        /**
         * Creates a new instance of VashEngine class
         * @param {HttpContext|*} context - The underlying HTTP context.
         * @returns {VashEngine}
         */
        createInstance:function(context) {
            return new VashEngine(context);
        }
    };
}
