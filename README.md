# Lumiere Alexa Skill

Alexa skill to change Lumiere lights.

## Development

1. Install [ask](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html): `npm install ask -g`
    * Make sure that you have `~/.aws/config` and `~/.aws/credentials` setup.
    * Run `ask init`
1. Update lambda function and dependencies in `lambda/custom/`
1. Update model(s) in `models/`
1. Deploy: `ask deploy`
1. Test: `ask simulate --locale="en-us" --text="ask lumiere change lights red, blue, silver" --debug`

## Publish

1. Update and publish on [Amazon](https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.862e89f1-131f-4fb1-92d6-f9e92e6d40ff/en_US/info)
1. ??
