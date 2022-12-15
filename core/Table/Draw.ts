import { Player } from '../Gamer/Player'
import { Card } from '../CardSet/Card'
import { CardFaceEnum } from '../CardSet/Enum/CardFaceEnum'
import { CardSuitEnum } from '../CardSet/Enum/CardSuitEnum'
import { IPlayer } from '../Gamer/Interface/IPlayer'

const clc = require('cli-color')

// patterns: facade
export class Draw {

  private readonly player: IPlayer
  private readonly dealer: IPlayer

  constructor (player: IPlayer, dealer: IPlayer) {
    this.player = player
    this.dealer = dealer
  }

  welcome (): void {
    process.stdout.write('╭─────────────────────╮\n')
    process.stdout.write('│                     │\n')
    process.stdout.write('│      Welcome!       │\n')
    process.stdout.write('│                     │\n')
    process.stdout.write('╰─────────────────────╯\n')
  }

  render (): void {
    process.stdout.write('*******************************\n')
    process.stdout.write('Dealer hand:\n')
    process.stdout.write('Points: ' + this.dealer.points + '\n')
    this.renderCards(this.dealer)

    process.stdout.write('Your hand:\n')
    process.stdout.write('Points: ' + this.player.points + '\n')
    this.renderCards(this.player)
  }

  // рисуем карты
  private renderCards (player: IPlayer): void {

    let line_1: string = ''
    let line_2: string = ''
    let line_3: string = ''
    let line_4: string = ''
    let line_5: string = ''
    let line_6: string = ''
    let line_7: string = ''

    player.cards.forEach((card: Card) => {
      line_1 += '┌───────┐ '
      line_2 += this.getLeftFaceLine(card)
      line_3 += '│       │ '
      line_4 += '│   ' + this.getSuit(card) + '   │ '
      line_5 += '│       │ '
      line_6 += this.getRightFaceLine(card)
      line_7 += '└───────┘ '
    })

    process.stdout.write(line_1 + '\n')
    process.stdout.write(line_2 + '\n')
    process.stdout.write(line_3 + '\n')
    process.stdout.write(line_4 + '\n')
    process.stdout.write(line_5 + '\n')
    process.stdout.write(line_6 + '\n')
    process.stdout.write(line_7 + '\n')
  }

  // если попадается десятка, то отступ надо на 1 пробел меньше

  private getLeftFaceLine (card: Card): string {
    return '│' + this.paintText(card.face, card.suit) + (card.face === CardFaceEnum.ten ? '     │ ' : '      │ ')
  }

  // если попадается десятка, то отступ надо на 1 пробел меньше

  private getRightFaceLine (card: Card): string {
    return (card.face === CardFaceEnum.ten ? '│     ' : '│      ') + this.paintText(card.face, card.suit) + '| '
  }

  private getSuit (card: Card): string {
    return this.paintText(card.suit, card.suit)
  }

  // червы и бубны красим в красный

  private paintText (text: string, suite: CardSuitEnum): string {

    if (suite === CardSuitEnum.hearts || suite === CardSuitEnum.diamonds) {
      return clc.red(text)
    }

    return clc.black(text)
  }
}