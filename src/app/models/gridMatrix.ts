import { Injectable } from "@angular/core";
import { Tile } from "./tile";
import * as _ from 'lodash';
import { Character } from "./character";
import { Spell } from "./spell";
import { Enemy } from "./enemy";
import { BasicItem } from "./basicItem";
import { Shop } from "./shop";
import { Altar } from "./altar";

@Injectable()
export class GridMatrix {
    tileArray;

    character: Character;

    constructor(character: Character) {
        this.character = character;
        let tiles = [];
        let initialXCoord = Math.round(Math.random() * 16 + 2);
        let initialYCoord = Math.round(Math.random() * 16 + 2);
        tiles.push(new Tile(true, false, true, this.character, initialXCoord, initialYCoord))

        // Spells
        let fireBall = new Spell('fireBall')
        tiles.push(new Tile(false, false, true, fireBall));
        let excludeList = [fireBall];
        for (let i = 0; i < this.character.spellsOnMap - 1; i++) {
            let newSpell = this.getRandomSpell(excludeList);
            if (newSpell instanceof Spell) {
                excludeList.push(newSpell)
            }
            tiles.push(new Tile(false, false, true, newSpell));
        }
        // Gold
        for (let i = 0; i < 7; i++) {
            tiles.push(new Tile(false, false, true, new BasicItem('gold')));
        }
        // stat boosts
        for (let i = 0; i < 3; i++) {
            tiles.push(new Tile(false, false, true, new BasicItem('strengthBoost')));
            tiles.push(new Tile(false, false, true, new BasicItem('healthBoost')));
            tiles.push(new Tile(false, false, true, new BasicItem('manaBoost')));
        }
        // shops
        for (let i = 0; i < 3; i++) {
            tiles.push(new Tile(false, false, true, new Shop()));
        }
        // churches
        for (let i = 0; i < 3; i++) {
            tiles.push(new Tile(false, false, true, new Altar()));
        }
        // potions
        for (let i = 0; i < 3; i++) {
            tiles.push(new Tile(false, false, true, new BasicItem('healthPotion')));
            tiles.push(new Tile(false, false, true, new BasicItem('manaPotion')));
        }

        // level 1
        for (let i = 0; i < 10; i++) {
            tiles.push(new Tile(false, false, true, new Enemy(1)));
        }
        // level 2
        for (let i = 0; i < 5; i++) {
            tiles.push(new Tile(false, false, true, new Enemy(2)));
        }
        // level 3
        for (let i = 0; i < 4; i++) {
            tiles.push(new Tile(false, false, true, new Enemy(3)));
        }
        // level 4, 5, 6, 7, 8
        for (let i = 0; i < 3; i++) {
            tiles.push(new Tile(false, false, true, new Enemy(4)));
            tiles.push(new Tile(false, false, true, new Enemy(5)));
            tiles.push(new Tile(false, false, true, new Enemy(6)));
            tiles.push(new Tile(false, false, true, new Enemy(7)));
            tiles.push(new Tile(false, false, true, new Enemy(8)));
        }
        // level 9
        for (let i = 0; i < 2; i++) {
            tiles.push(new Tile(false, false, true, new Enemy(9)));
        }
        // level 10
        tiles.push(new Tile(false, false, true, new Enemy(10)));

        // explorable wall tiles
        for (let i = 0; i < 150; i++) {
            let newtile = new Tile(false, false, false, new BasicItem('wall'));
            tiles.push(newtile);
        }

        // unexplorable wall tiles
        for (let i = 0; i < 50; i++) {
            let newtile = new Tile(false, false, false, new BasicItem('wall'));
            tiles.push(newtile);
        }

        let remaining = 400 - tiles.length;
        // walkable empty tiles
        for (let i = 0; i < remaining; i++) {
            let newtile = new Tile(false, false, true, new BasicItem('empty'));
            tiles.push(newtile);
        }



        let walkableList = _.filter(tiles, function (tile) {
            return tile.walkable
        });

        let walkableCoords = this.getWalkablePath(initialXCoord, initialYCoord, walkableList.length);

        walkableCoords.forEach(coordinate => {
            if (!(coordinate.xCoord == initialXCoord && coordinate.yCoord == initialYCoord)) {
                let unsetTiles = _.filter(walkableList, function (tile) {
                    return tile.walkable && tile.xCoord == null && tile.yCoord == null
                });
                let newTile = this.getRandomTile(unsetTiles)
                if (this.coordinateTouchingStart(initialXCoord, initialYCoord, coordinate)) {
                    newTile.explored = true;
                }
                newTile.xCoord = coordinate.xCoord;
                newTile.yCoord = coordinate.yCoord;
            }
        })

        let unwalkableList = _.filter(tiles, function (tile) {
            return !tile.walkable && tile.xCoord == null && tile.yCoord == null
        });



        this.setUnwalkableTileCoords(walkableCoords, unwalkableList);
        tiles = this.formatMatrix(tiles);


        this.tileArray = tiles;
    }

    getRandomSpell(excludelist) {
        let spellnum = Math.round(Math.random() * 12);

        switch (spellnum) {
            case 0:
                if (_.find(excludelist, { name: 'Poison' }) == null) {
                    return new Spell('poison')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 1:
                if (_.find(excludelist, { name: 'Blood Magic' }) == null) {
                    return new Spell('bloodMagic')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 2:
                if (_.find(excludelist, { name: 'Might' }) == null) {
                    return new Spell('might')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 3:
                if (_.find(excludelist, { name: 'Death Defy' }) == null) {
                    return new Spell('deathDefy')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 4:
                if (_.find(excludelist, { name: 'Destroy Wall' }) == null) {
                    return new Spell('destroyWall')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 5:
                if (_.find(excludelist, { name: 'First Strike' }) == null) {
                    return new Spell('firstStrike')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 6:
                if (_.find(excludelist, { name: 'Heal' }) == null) {
                    return new Spell('heal')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 7:
                if (_.find(excludelist, { name: 'Petrify' }) == null) {
                    return new Spell('petrify')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 8:
                if (_.find(excludelist, { name: 'Reveal' }) == null) {
                    return new Spell('reveal')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 9:
                if (_.find(excludelist, { name: 'Teleport Monster' }) == null) {
                    return new Spell('teleportMonster')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 10:
                if (_.find(excludelist, { name: 'Teleport' }) == null) {
                    return new Spell('teleport')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 11:
                if (_.find(excludelist, { name: 'Summon' }) == null) {
                    return new Spell('summon')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            case 12:
                if (_.find(excludelist, { name: 'Fire Ball' }) == null) {
                    return new Spell('fireBall')
                } else {
                    return this.getRandomSpell(excludelist)
                }
            default:
                break;
        }

        return 'spell'
    }

    getRandomTile(tileList) {
        let randomIndex = Math.round(Math.random() * (tileList.length - 1))
        let randomTile = tileList[randomIndex];
        if (randomTile.xCoord == null || randomTile.yCoord == null) {
            return randomTile
        }
    }



    private getWalkablePath(xCoord, yCoord, tileNumber) {
        let tileCoords = [{ xCoord: xCoord, yCoord: yCoord }];

        tileCoords.push({ xCoord: xCoord + 1, yCoord: yCoord + 1 });
        tileCoords.push({ xCoord: xCoord - 1, yCoord: yCoord - 1 });
        tileCoords.push({ xCoord: xCoord + 1, yCoord: yCoord - 1 });
        tileCoords.push({ xCoord: xCoord - 1, yCoord: yCoord + 1 });
        tileCoords.push({ xCoord: xCoord + 1, yCoord: yCoord });
        tileCoords.push({ xCoord: xCoord, yCoord: yCoord - 1 });
        tileCoords.push({ xCoord: xCoord, yCoord: yCoord + 1 });
        tileCoords.push({ xCoord: xCoord - 1, yCoord: yCoord });



        let currentCoord;
        //currentCoord = this.getRandomCoordinate(tileCoords, xCoord, yCoord);

        for (let i = 0; i < tileNumber - 9; i++) {
            if (i >= 20 && i % 20 == 0) {
                currentCoord = this.getRandomCoordinate(tileCoords, 15, 0);
            } else {
                currentCoord = this.getRandomCoordinate(tileCoords, null, 0);
            }


            if (i == tileNumber / 3) {
                let xCoords = _.map(tileCoords, 'xCoord');
                let yCoords = _.map(tileCoords, 'yCoord');


                let mostCommonX = _.head(_(xCoords)
                    .countBy()
                    .entries()
                    .maxBy(_.last));

                mostCommonX = 19 - mostCommonX;

                let mostCommonY = _.head(_(yCoords)
                    .countBy()
                    .entries()
                    .maxBy(_.last));

                mostCommonY = 19 - mostCommonY;

                currentCoord = { xCoord: mostCommonX, yCoord: mostCommonY };
            }

            let expansionCoordinate = this.getNewCoordinate(currentCoord, tileCoords, 0);
            currentCoord = expansionCoordinate;
            tileCoords.push(expansionCoordinate);
        }

        return tileCoords;
    }

    getRandomCoordinate(coordinates, refresh, recursionCount) {
        if (recursionCount >= 15) {
            refresh = 1
        }

        let currentCoordIndex = (coordinates.length - 1) - Math.round(Math.random() * 4);

        if (refresh != null) {
            currentCoordIndex = Math.round(Math.random() * (coordinates.length - refresh));
        }
        let currentCoord = coordinates[currentCoordIndex]
        let surrounded = this.isSurrounded(currentCoord, coordinates);


        if (surrounded) {
            return this.getRandomCoordinate(coordinates, refresh, recursionCount + 1);
        } else {
            return currentCoord;
        }
    }

    isSurrounded(currentCoord, coordinates) {
        let surrounded =
            (_.find(coordinates, { xCoord: currentCoord.xCoord + 1, yCoord: currentCoord.yCoord }) != null || currentCoord.xCoord + 1 > 19) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord, yCoord: currentCoord.yCoord + 1 }) != null || currentCoord.yCoord + 1 > 19) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord + 1, yCoord: currentCoord.yCoord + 1 }) != null || currentCoord.xCoord + 1 > 19 || currentCoord.yCoord + 1 > 19) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord - 1, yCoord: currentCoord.yCoord }) != null || currentCoord.xCoord - 1 < 0) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord, yCoord: currentCoord.yCoord - 1 }) != null || currentCoord.yCoord - 1 < 0) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord - 1, yCoord: currentCoord.yCoord - 1 }) != null || currentCoord.xCoord - 1 < 0 || currentCoord.yCoord - 1 < 0) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord + 1, yCoord: currentCoord.yCoord - 1 }) != null || currentCoord.xCoord + 1 > 19 || currentCoord.yCoord - 1 < 0) &&
            (_.find(coordinates, { xCoord: currentCoord.xCoord - 1, yCoord: currentCoord.yCoord + 1 }) != null || currentCoord.yCoord + 1 > 19 || currentCoord.xCoord - 1 < 0);

        return surrounded;
    }

    coordinateTouchingStart(initialXCoord, initialYCoord, coordinate) {
        if ((coordinate.xCoord == initialXCoord + 1 ||
            coordinate.xCoord == initialXCoord - 1 ||
            coordinate.xCoord == initialXCoord) &&
            (coordinate.yCoord == initialYCoord + 1 ||
                coordinate.yCoord == initialYCoord - 1 ||
                coordinate.yCoord == initialYCoord)
        ) {
            return true;
        }

        return false;
    }

    getNewCoordinate(currentCoord, coordinates, recursionCount) {

        if (recursionCount >= 15) {
            currentCoord = this.getRandomCoordinate(coordinates, 1, 0);
            recursionCount = 0
        }

        let xBias = 1;
        let yBias = 1;
        let xBiasPos = false;
        let xBiasNeg = false;
        let yBiasPos = false;
        let yBiasNeg = false;
        if (_.find(coordinates, { xCoord: currentCoord.xCoord + 1, yCoord: currentCoord.yCoord }) != null || currentCoord.xCoord == 19) {
            xBiasNeg = true;
            xBias = - 1
        }
        if (_.find(coordinates, { xCoord: currentCoord.xCoord - 1, yCoord: currentCoord.yCoord }) != null || currentCoord.xCoord == 0) {
            xBias = 1
            xBiasPos = true;
        }

        if (_.find(coordinates, { xCoord: currentCoord.xCoord, yCoord: currentCoord.yCoord + 1 }) != null || currentCoord.yCoord == 19) {
            yBias = - 1
            yBiasNeg = true;
        }
        if (_.find(coordinates, { xCoord: currentCoord.xCoord, yCoord: currentCoord.yCoord - 1 }) != null || currentCoord.yCoord == 0) {
            yBias = 1
            yBiasPos = true;
        }

        let xRand = Math.random();
        let yRand = Math.random();
        if (xBiasNeg && xBiasPos) {
            if (xRand > 0.95) {
                xBias = xBias * - 1;
            }
            if (xRand < 0.90) {
                xBias = xBias * 0;
            }
        } else {
            if (xRand > 0.80) {
                xBias = xBias * - 1;
            }
            if (xRand < 0.20) {
                xBias = xBias * 0;
            }
        }


        if (yBiasNeg && yBiasPos) {
            if (yRand > 0.95) {
                yBias = yBias * - 1;
            }
            if (xRand < 0.90) {
                yBias = yBias * 0;
            }
        } else {
            if (yRand > 0.80) {
                yBias = yBias * - 1;
            }
            if (yRand < 0.20) {
                yBias = yBias * 0;
            }
        }

        let newXCoord = currentCoord.xCoord + xBias
        let newYCoord = currentCoord.yCoord + yBias


        let included = _.find(coordinates, { xCoord: newXCoord, yCoord: newYCoord });
        if ((currentCoord.xCoord == newXCoord && currentCoord.yCoord == newYCoord) || included != null || newXCoord > 19 || newXCoord < 0 || newYCoord > 19 || newYCoord < 0) {
            return this.getNewCoordinate(currentCoord, coordinates, recursionCount + 1);
        } else {
            return { xCoord: newXCoord, yCoord: newYCoord }
        }
    }


    setUnwalkableTileCoords(walkableCoords, unwalkableTiles) {
        let unwalkableCoords = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (_.find(walkableCoords, { xCoord: i, yCoord: j }) == null) {
                    unwalkableCoords.push({ xCoord: i, yCoord: j })
                }
            }
        }

        for (let i = 0; i < unwalkableTiles.length; i++) {
            unwalkableTiles[i].xCoord = unwalkableCoords[i].xCoord;
            unwalkableTiles[i].yCoord = unwalkableCoords[i].yCoord;
        }
    }

    formatMatrix(tiles) {
        let tileArray = []

        for (let i = 0; i < 20; i++) {
            let innerArray = [];
            for (let j = 0; j < 20; j++) {
                tiles.forEach(tile => {
                    if (tile.xCoord == i && tile.yCoord == j) {
                        innerArray.push(tile)
                    }
                })
            }
            tileArray.push(innerArray)
        }
        return tileArray
    }

    getPlayerTile() {
        let playerTile;
        this.tileArray.forEach(row => {
            row.forEach(tile => {
                if (tile.contents instanceof Character || tile.playerAndContent) {
                    playerTile = tile;
                }
            })
        })
        return playerTile;
    }

    clickedTile(clickedTile, character) {

        let playerTile = this.getPlayerTile();

        if (playerTile.contents instanceof Character && !(clickedTile.contents instanceof Enemy)) {
            playerTile.contents = new BasicItem('empty');
        }
        if (playerTile.playerAndContent) {
            playerTile.playerAndContent = false;
        }

        this.clickAction(clickedTile, character);

        let x = clickedTile.xCoord;
        let y = clickedTile.yCoord;

        let top = true;
        let bot = true;
        let left = true;
        let right = true;

        if (x + 1 > 19) {
            right = false
        }
        if (x - 1 < 0) {
            left = false
        }
        if (y + 1 > 19) {
            top = false
        }
        if (y - 1 < 0) {
            bot = false
        }

        if (right) {
            if (!this.tileArray[x + 1][y].explored) {
                this.tileArray[x + 1][y].explored = true;
                character.exploredSquare();
            }
            if (top) {
                if (!this.tileArray[x + 1][y + 1].explored) {
                    this.tileArray[x + 1][y + 1].explored = true;
                    character.exploredSquare();
                }
            }
            if (bot) {
                if (!this.tileArray[x + 1][y - 1].explored) {
                    this.tileArray[x + 1][y - 1].explored = true;
                    character.exploredSquare();
                }
            }
        }

        if (left) {
            if (!this.tileArray[x - 1][y].explored) {
                this.tileArray[x - 1][y].explored = true;
                character.exploredSquare();
            }
            if (top) {
                if (!this.tileArray[x - 1][y + 1].explored) {
                    this.tileArray[x - 1][y + 1].explored = true;
                    character.exploredSquare();
                }
            }
            if (bot) {
                if (!this.tileArray[x - 1][y - 1].explored) {
                    this.tileArray[x - 1][y - 1].explored = true;
                    character.exploredSquare();
                }
            }
        }

        if (top) {
            if (!this.tileArray[x][y + 1].explored) {
                this.tileArray[x][y + 1].explored = true;
                character.exploredSquare();
            }
        }

        if (top) {
            if (!this.tileArray[x][y - 1].explored) {
                this.tileArray[x][y - 1].explored = true;
                character.exploredSquare();
            }
        }
    }



    clickAction(clickedTile, character) {
        if (clickedTile.contents instanceof BasicItem) {
            clickedTile.contents.pickupAction(character);
        }

        if (clickedTile.canInteractWith()) {
            clickedTile.playerAndContent = true;
        } else if(clickedTile.contents instanceof Enemy){
            clickedTile.contents.combat(character);
        } else
            {
            clickedTile.contents = this.character
        }
        return;
    }
}