import { Draw } from './Draw'
import { HitStandEnum } from './Enum/HitStandEnum'
import { PlayerFactory } from '../Gamer/PlayerFactory'
import { PlayerTypeEnum } from '../Gamer/Enum/PlayerTypeEnum'
import { PrizeCalculator } from './Prize/PrizeCalculator'
import { Dialog } from './Dialog'
import { IPlayer } from '../Gamer/Interface/IPlayer'

const clc = require('cli-color')

/**
 * Игровой стол, в нем есть игроки, текущий баланс, ставка, холст для отрисовки карт
 */
export class Table {

  private balance: number = 100

  private bet: number = 0

  private player: IPlayer
  private dealer: IPlayer
  private draw: Draw

  constructor () {
    this.player = PlayerFactory.create(PlayerTypeEnum.player)
    this.dealer = PlayerFactory.create(PlayerTypeEnum.dealer)

    this.draw = new Draw(this.player, this.dealer)
  }

  async init (): Promise<void> {
    this.draw.welcome()

    // цикл с раундами
    while (this.balance > 0) {
      // генерим карты, спрашиваем ставку, рисуем стол
      await this.initRound()

      // спрашиваем, надо ли еще карту, проверяем результат
      await this.playerTurn()

      // если у игрока не перебор или он больше не хочет карты - подключаем бота для дилера
      if (this.player.points <= this.player.win_points) {
        await this.dealerTurn()
      }
    }

    this.endGame()
  }

  private async initRound (): Promise<void> {
    this.player = PlayerFactory.create(PlayerTypeEnum.player)
    this.dealer = PlayerFactory.create(PlayerTypeEnum.dealer)

    this.draw = new Draw(this.player, this.dealer)

    // выводим баланс
    await this.showBalance()

    // спрашиваем ставку
    await this.betRequest()

    // рендерим карты на столе
    this.draw.render()
  }

  private async dealerTurn (): Promise<void> {

    // проверяем, стоит ли прерывать раунд
    if (this.checkEndRound()) {
      return
    }

    // если у дилера меньше - продолжаем набирать
    if (this.dealer.points < this.player.points) {
      this.dealer.addCard()
      this.draw.render()

      await this.sleep(1000)

      await this.dealerTurn()
    }

    return
  }

  private checkEndRound (): boolean {

    // если у дилера перебор - игрок выиграл
    if (this.dealer.points > this.dealer.win_points) {
      this.updateBalance()
      return true
    }

    // если у дилера больше - игрок проиграл
    if (this.dealer.points > this.player.points) {
      this.updateBalance()
      return true
    }

    // если поровну - ничья
    if (this.dealer.points === this.player.points) {
      this.updateBalance()
      return true
    }

    return false
  }

  private updateBalance (): void {
    this.balance += this.getPrize()
  }

  private sleep (ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // запускаем в цикле ходы игрока, пока не соберет перебор или не откажется от карты
  private async playerTurn (): Promise<void> {

    // если перебор - заканчиваем раунд
    if (this.player.points > this.player.win_points) {
      this.updateBalance()
      return
    }

    // ждем решения - надо карту или нет
    let answer = await Dialog.hitStand()

    // если нужна еще карта
    while (answer === HitStandEnum.hit) {

      // добавляем карту, рендерим
      this.player.addCard()
      this.draw.render()

      await this.playerTurn()

      // во избежание рекурсии
      answer = HitStandEnum.stand
    }

    return
  }

  private endGame (): void {
    console.log(clc.red('You don\'t have enough money for a bet. Thanks for playing'))

    return
  }

  // проверяем результат, выводим его в консоль, прибавляем к балансу
  private getPrize (): number {
    return PrizeCalculator.getPrize(this.bet, this.player, this.dealer)
  }

  // запрашиваем у игрока его ставку
  private async betRequest (): Promise<void> {

    let bet = await Dialog.getBet()

    // если указали не положительное число, или ставка превышает баланс
    while (bet <= 0 || bet > this.balance) {

      let message = 'Your balance less then bet.'

      if (bet <= 0) {
        message = 'The bet must be positive.'
      }

      console.log(clc.red(message))

      bet = await Dialog.getBet()
    }

    this.bet = bet
  }

  private showBalance (): void {
    process.stdout.write(`You have: ` + clc.green(`$` + this.balance) + `\n`)
  }
}