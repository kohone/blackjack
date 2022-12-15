import { WonPrize } from './Strategies/WonPrize'
import { LostPrize } from './Strategies/LostPrize'
import { DrawPrize } from './Strategies/DrawPrize'
import { IPlayer } from '../../Gamer/Interface/IPlayer'
import { IPrizeStrategy } from './Strategies/IPrizeStrategy'

// patterns: Strategy
export class PrizeCalculator {

  /**
   * считаем сумму приза и выводим уведомления в терминал
   *
   * @param bet
   * @param player
   * @param dealer
   */
  static getPrize (bet: number, player: IPlayer, dealer: IPlayer): number {

    // определяем стратегию поведения
    const strategy = PrizeCalculator.getStrategy(player, dealer)

    const prize = Math.round(strategy.prize_ratio * bet)
    const mark = prize < 0 ? '-$' : '+$'

    PrizeCalculator.toLog(strategy.color(`${strategy.message} You got ${player.points} and dealer ${dealer.points}.`))
    PrizeCalculator.toLog(strategy.color(mark + Math.abs(prize)))

    return prize
  }

  /**
   * определяем стратегию расчета приза и вывода в консоль итога раунда исходя из результата
   *
   * @param player
   * @param dealer
   * @private
   */
  private static getStrategy (player: IPlayer, dealer: IPlayer): IPrizeStrategy {

    // у игрока больше чем 21
    if (player.points > player.win_points) {
      return new LostPrize()
    }

    // у дилера больше чем 21
    if (dealer.points > dealer.win_points) {
      return new WonPrize()
    }

    // у игрока больше чем у дилера
    if (player.points > dealer.points) {
      return new WonPrize()
    }

    // у дилера больше чем у игрока
    if (dealer.points > player.points) {
      return new LostPrize()
    }

    // поровну
    return new DrawPrize()
  }

  private static toLog (message: string): void {
    console.log(message)
  }
}