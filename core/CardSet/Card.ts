import { CardSuitEnum } from './Enum/CardSuitEnum'
import { CardFaceEnum } from './Enum/CardFaceEnum'

export class Card {
  constructor (public readonly face: CardFaceEnum, public readonly suit: CardSuitEnum) {
  }
}