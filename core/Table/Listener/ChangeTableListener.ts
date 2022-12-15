import { Listener } from '../../Observer/Listener'
import { Card } from '../../CardSet/Card'
import { CardFaceEnum } from '../../CardSet/Enum/CardFaceEnum'
import { IPlayer } from '../../Gamer/Interface/IPlayer'

// преобразуем набор карт в очки
// patterns: Adapter, Event-Listener
export class ChangeTableListener implements Listener {

  constructor (public player: IPlayer) {
  }

  // пересчитываем количество очков в руке
  async handle (): Promise<void> {
    await this.convertCardToPoints()
  }

  private async convertCardToPoints (): Promise<void> {
    let points: number = 0

    // количество тузов, в зависимости от очков на руке, он может давать 1 или 11 очков
    let aces: number = 0

    this.player.cards.forEach((card: Card): void => {

      switch (card.face) {

        // все "картинки" по 10
        case CardFaceEnum.J:
        case CardFaceEnum.Q:
        case CardFaceEnum.K:
          points += 10
          break

        // для тузов особые условия, смотреть ниже
        case CardFaceEnum.A:
          aces++
          break

        // для мелких прибавляем их номинал
        default:
          points += +card.face
          break
      }
    })

    // если с тузом количество очков становится больше 21, то тузы идут по 1 очку
    while (aces-- > 0) {
      points += 11
      if (points > 21) {
        points -= 10
      }
    }

    this.player.points = points
  }
}