import Campaign, { GameLocationConnections } from "./classes/Campaign"
import Enemy from "./classes/entities/Enemy"
import PlayerChar from "./classes/entities/PlayerChar"
import Dungeon from "./classes/locations/Dungeon"
import DungeonLevel from "./classes/locations/DungeonLevel"
import Field from "./classes/locations/Field"
import Town from "./classes/locations/Town"
import PhysicalAttack from "./classes/skills/PhysicalAttack"

const starterTown = new Town("Little Town");

const basicBash = new PhysicalAttack("Bash",1,);

const feralWolf=new Enemy(10,0,1,0,0,0,5,basicBash,"Feral Wolf",);

const firstField=new Field("Field of Light",.25,5,[feralWolf]);

const lightGob=new Enemy(12,0,2,1,0,0,4,basicBash,"Light Goblin")

const bigLigGob=new Enemy(20,0,4,2,0,0,1,basicBash,"Big Light Goblin")

const fDunL1=new DungeonLevel([lightGob])
const fDunL2=new DungeonLevel([lightGob])
const fDunL3=new DungeonLevel([lightGob,bigLigGob])

const firstDungeon=new Dungeon("Dungeon of Light",[fDunL1,fDunL2,fDunL3])

const darkWolf=new Enemy(12,0,3,1,0,0,5,basicBash,"Dark Wolf")

const floatEye=new Enemy(4,0,1,1,0,0,7,basicBash,"Floating Eye")

const secondField=new Field("Field of Darkness",.34,5,[darkWolf,floatEye])

const darkGob = new Enemy(15,0,4,3,0,0,3,basicBash,"Dark Goblin")

const bigDarkGob=new Enemy(25,0,7,5,0,0,1,basicBash,"Dungeon King Goblin")

const finDunL1=new DungeonLevel([darkGob])
const finDunL2=new DungeonLevel([darkGob])
const finDunL3=new DungeonLevel([darkGob,bigDarkGob])

const finDungeon=new Dungeon("Dungeon of Darkness",[finDunL1,finDunL2,finDunL3])

const starterTownConns = new GameLocationConnections(starterTown,[firstField])
const firstFieldConns= new GameLocationConnections(firstField,[starterTown,firstDungeon,secondField])
const firstDungeonConns= new GameLocationConnections(firstDungeon,[firstField])
const secondFieldConns= new GameLocationConnections(secondField,[firstField,finDungeon])
const finDungeonConns= new GameLocationConnections(finDungeon,[secondField])

const baseCampaignPlayerChar=new PlayerChar(70,0,5,5,0,0,5,basicBash)

const baseCampaign=new Campaign(baseCampaignPlayerChar,2,[starterTownConns,firstFieldConns,firstDungeonConns,secondFieldConns,finDungeonConns])

export default baseCampaign