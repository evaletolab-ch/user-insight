[![David](https://img.shields.io/david/evaletolab-ch/user-insight.svg?style=flat)](https://david-dm.org/evaletolab-ch/user-insight)
[![Build Status](https://travis-ci.org/evaletolab-ch/user-insight.svg?branch=master)](https://travis-ci.org/evaletolab-ch/user-insight)
[![Join the chat at https://gitter.im/evaletolab-ch/user-insight](https://badges.gitter.im/evaletolab-ch/user-insight.svg)](https://gitter.im/evaletolab-ch/user-insight?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Main usage

The purpose of this project is to provide a simple and intiutive API to handle a powerfull insight from mailchimp and facebook.
Get Ads insight, objectives insight, mail campaigns (open,click,links, audiance) insight

## Prerequisites
install node.js with [NVM](https://github.com/creationix/nvm) (required). 

    nvm install v6.9.5
    nvm use v6.9.5

## Installation
From github,    

    git clone https://github.com/evaletolab-ch/user-insight
    cd user-insight

Easiest way to install user-insight is by using npm *(not yet ready for production)*:
    npm install -g mocha
    npm install --save user-insight


## Running unit tests

To run unit tests you need [Mocha](https://github.com/visionmedia/mocha),
and [should.js](https://github.com/visionmedia/should.js). The tests are run simply by simply typing:

    NODE_ENV=test mocha

Do not run tests with your live processor. Make sure you are running in a
sandbox.


## License
The API is available under AGPL V3 to protect the long term interests of the community – you are free to use it with no restrictions but if you change the server code, then those code changes must be contributed back.

> Copyright (c) 2014 Olivier Evalet (http://evaletolab.ch/)<br/>
> <br/><br/>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the “Software”), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> <br/>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
> <br/>
> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
