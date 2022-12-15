import { IPrizeStrategy } from './IPrizeStrategy'
const clc = require('cli-color')

export class DrawPrize implements IPrizeStrategy {
  prize_ratio: number = 0
  message: string = 'The draw!'

  color: Function = clc.blue
}