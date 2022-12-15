import { IPrizeStrategy } from './IPrizeStrategy'
const clc = require('cli-color')

export class LostPrize implements IPrizeStrategy {
  prize_ratio: number = -1

  message: string = 'You lost!'

  color: Function = clc.red
}
