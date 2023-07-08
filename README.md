# Tavlia
A user, browser, and text-based RPG.

## How?
Using a Django-Python-powered CRUD/REST API to manage data, like campaigns, campaign assets, save data, and users, and a React-TypeScript frontend to display and play, this game will aim to be robust and dynamic and allowing for user-creativity and sharing.

# Design

## User Stories

### MVP
A user could be a creator, who creates assets and campaigns, and/or a player, who plays through campaigns.

As a creator, I want to be able to:
- [ ] Create assets in order to give my own flavor to my campaigns, including:
    - [ ] Locations, like towns, adventure fields, and assets
    - [ ] Shops      
    - [ ] Items, like weapons and heals
    - [ ] Enemies
    - [ ] Skills/Attacks
- [ ] Be able to string assets together into my own campaign

As a player, I want to be able to:
- [ ] Be able to play through published campaigns

### Stretch/Extra
As a creator, I want to be able to:
- [ ] Share assets in order to help other creators save time making their own assets as well as allow them to make new creations on top of my own

As a player, I want to be able to:
- [ ] Save my progress on each campaign so I can play at my own pace without having to play and complete campaigns in one sitting
- [ ] Share my saves so others can play from when I last left off or create my own 'gamemodes' on top of campaigns

## Milestones
- [ ] User Auth complete
- [ ] Assets CRUD on backend
    - [ ] Locations CRUD complete
    - [ ] Enemies CRUD complete
    - [ ] Items CRUD complete
    - [ ] Skills/Attacks complete
- [ ] Playable on frontend
- [ ] Creatable on frontend

## Wireframes
Adventure Screen:
![Wireframe mockup of an adventure screen](md-assets/wireframes/screen-main-adventure.png)

Battle Screen:
![Wireframe mockup of a battle screen](md-assets/wireframes/screen-battle.png)

Shop Screen:
![Wireframe mockup of a shop screen](md-assets/wireframes/screen-main-shop.png)

Campaign Creation Screen:
![Wireframe mockup of the campaign creation screen](md-assets/wireframes/screen-creation.png)
