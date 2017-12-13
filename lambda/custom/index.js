'use strict';
const querystring = require('querystring');
const Alexa = require('alexa-sdk');
const fetch = require('node-fetch');

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build

exports.handler = function(event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  // Intents.  Is this one built-in?
  LaunchRequest: function() {
    this.emit('SayHello');
  },

  ChangeLightsIntent: function() {
    this.emit('SayLightsChanged');
  },

  // Responses
  SayHello: function() {
    this.response.speak('Hi');
    this.emit(':responseReady');
  },

  SayLightsNotChanged: function() {
    let message =
      'Sorry, something went wrong with changing the lights, please try again.';

    this.response.speak(message).cardRenderer('Lumiere', message);
    this.emit(':responseReady');
  },

  SayLightsChanged: function() {
    let lights = this.event.request.intent.slots.LightsSlot.value;

    // Make request to lumiere
    let params = {
      source: 'Alexa'
    };
    if (!lights) {
      params.random = 'true';
    }
    else {
      params.colors = lights;
    }

    let url =
      'http://lumiere.lighting/api/colors/text?' +
      querystring.stringify(params);

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.error(json);
        if (json && !json.error) {
          this.response
            .speak(
              json && json.response
                ? json.response
                : 'Lights changed, they should show up soon.'
            )
            .cardRenderer(
              'Lumiere',
              `Lights changed${lights ? ' to ' + lights : '!'}`
            );
          this.emit(':responseReady');
        }
        else {
          this.response.speak(
            json.response ||
              'Sorry, something went wrong when trying to update the lights.'
          );
        }
      })
      .catch(error => {
        console.error(error);
        this.emit('SayLightsNotChanged');
      });
  },

  // Built-in intents
  'AMAZON.StopIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function() {
    this.response
      .speak(`You can try "Alexa, tell Lumiere Bot to change the lights"
      or "Alexa, tell Lumerie Bot to change the lights to red".`);
    this.emit(':responseReady');
  },

  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  // General handlers
  SessionEndedRequest: function() {
    console.error('Session ended with reason: ' + this.event.request.reason);
  },

  Unhandled: function() {
    this.response.speak(`Sorry, I did not understand that, please try
      something like "Alexa, tell Lumiere Bot to change the lights"`);
  }
};
