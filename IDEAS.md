Story:
    The world is a black (fully peppered) tile board. Hidden unseen are levels of salt. Points are gained by having Salt (the name of the character) on a salty tile at the end of a phase; this collects the salt and removes it from the board. To move Salt over salty regions, you place Pepper (the other half of the character) in such a way that he pulls Salt to the salty tile. However, Pepper peppers up his surrounding region which covers (dampens) the salt level as long as Pepper remains. Pepper can be moved instantly once per phase. There is an additional tool in the duo's arsenal: the beacon. Beacons are used to illuminate where the salty areas are like lanturns. The board is beaten when you reach a threshold amount of points. Records are set for fewest number of Pepper movements.
    The game begins displaying only the map. The player then designates where they would like to initiate the positions of Salt, Pepper, and the beacons. With the addition of the first peice, the board state will react (for instance: illumination by Salt). Note: that no motion or scoring starts until Pepper is placed.

Classes:
    Game:
        holds board, player, beacons, time, settings, options
    Board:
        score: num for current score
        threshold: num score to beat board
        peppermoves: num for how many times Pepper was moved
        beaten: boolean for win status
        map: matrix corresponding to x,y holding values for:
            level: num corresponding to how many points can be earned on the space
            hidden: boolean for visibility
    Player:
        has components:
            Salt: gathers all the points from high-level regions;
                has qualities:
                    position (held as pixel position but can be called as tile position)
                    radius: num for range of effect of visibility (illumination)
            Pepper: a stationary body that pulls Salt like gravity,
                exists on any pixel in the board (not restricted to cells);
                has qualities:
                    position (held as pixel position but can be called as tile position)
                    moveable: boolean for whether position can be modified
                    radius: num for range of effect of peppering
        has characteristics (thought of representing as color of character):
            force: num representing strength which Pepper pulls Salt;
            mass: num to be used with force
            frequency: num for rate Pepper can be moved (inverse of phase duration);
    Beacon:
        remains stationary on a board tile illuminating surroundings;
        has characteristics:
            position: (held as pixel position but can be called as tile position)
            radius: num for range of illuminating ability;
            fuel: num for how long the beacon will illuminate;

Major functions:
    setListeners() {
        listenerForPause {pauses game and asks to exit to menu or return};
        listenerForCharacter {Game.settings.active = Player};
        listenerForBeacons {for each beacon: Game.settings.active = beacon};
        listenerForMap(e) {Game.settings.active.position = e.position};
    }
    phaseChange() {
        collectSalt() {
            Board.score += Board.positionScore(Player.Salt.position);
            Board.map[Player.Salt.tileX][Player.Salt.tileY].level -= some_amount;
        }
        if (Board.score >= Board.threshold) {
            Board.beaten = True;
            return
        }
        illuminateBeacons;
        Player.Pepper.moveable = True;
    }
    frameChange() {
        Player.updatePosition(time_elapsed) {use gravitational model on Salt.positon, Pepper.position, Player.force, time_elapsed, someMassConstant}
        render
    }
    render() {
        paintScoreboard
        paintBoard
        paintBeacons
        paintPlayer
    }

Board creation:
    could be manual, but a fun thought is a random bezier/arc generator (assuming bezier params are linked to match possible gravitational paths): selecting random sets of values that correspond to bezier parameters and linking them to each other in sequence. This allows for at least one 'good' path (rather than scanning the whole map). points could be added and adjusted on the bezier path to correspond more closely to the phase rate and player speed that would actually collect the tiles so that it can be traversed 'in phase'.
