import { PlayerTypeEnum } from './Enum/PlayerTypeEnum'
import { Player } from './Player'
import { IPlayer } from './Interface/IPlayer'

// patterns: Factory
export class PlayerFactory {

  static create (playerType: PlayerTypeEnum): IPlayer {

    const player = new Player()
    player.addCard()

    // игроку даем дополнительную карту, у дилера одна
    if (playerType === PlayerTypeEnum.player) {
      player.addCard()
    }

    return player
  }
}