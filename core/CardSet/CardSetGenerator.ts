import { Card } from './Card'
import { CardSuitEnum } from './Enum/CardSuitEnum'
import { CardFaceEnum } from './Enum/CardFaceEnum'

export class CardSetGenerator {
  private number_decks_in_set: number = 4

  private set: Card[] = []

  run (): Card[] {
    for (let i = 1; i <= this.number_decks_in_set; i++) {
      this.runIteration()
    }

    this.shuffle()

    return this.set
  }

  // добавляем колоду в набор карт
  private runIteration (): void {

    Object.keys(CardSuitEnum).forEach((suit: string) => {
      Object.keys(CardFaceEnum).forEach((face: string) => {

        const card_face = CardFaceEnum[face as keyof typeof CardFaceEnum]
        const card_suit = CardSuitEnum[suit as keyof typeof CardSuitEnum]

        const card = new Card(card_face, card_suit)

        this.set.push(card)
      })
    })
  }

  // перемешиваем набор
  private shuffle (): void {

    let currentIndex = this.set.length, randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      // And swap it with the current element.
      [this.set[currentIndex], this.set[randomIndex]] = [
        this.set[randomIndex], this.set[currentIndex]]
    }
  }
}