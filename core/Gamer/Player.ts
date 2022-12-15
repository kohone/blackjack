import { Card } from '../CardSet/Card'
import { CardSet } from '../CardSet/CardSet'
import { IPlayer } from './Interface/IPlayer'
import { ChangeTableListener } from '../Table/Listener/ChangeTableListener'
import { ChangeTableEvent } from '../Table/Event/ChangeTableEvent'

// patterns: observer
export class Player implements IPlayer {

  win_points: number = 21

  // current cards in hand
  public cards: Card[] = []

  // number of points in hand
  public points: number = 0

  private observer: ChangeTableEvent = new ChangeTableEvent()

  constructor () {
    this.observer.attach(new ChangeTableListener(this))
  }

  addCard (): void {
    // берем карту из колоды
    const cardSet = CardSet.getInstance().shift()

    if (cardSet) {
      // добавляем карту в руку
      this.cards.push(cardSet)
    } else {
      console.log('Карты в колоде закончились')
    }

    // дергаем событие, чтобы пересчитались очки в руке
    this.observer.dispatch()
  }
}