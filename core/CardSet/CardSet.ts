import { Card } from './Card'
import { CardSetGenerator } from './CardSetGenerator'

// набор карт для игры
// pattern: Singleton
export class CardSet {

  private static cardSet: Card[]

  private constructor () {
  }

  public static getInstance (): Card[] {
    if (!CardSet.cardSet) {
      // генерируем набор карт для игры
      CardSet.cardSet = new CardSetGenerator().run()
    }

    return CardSet.cardSet
  }
}