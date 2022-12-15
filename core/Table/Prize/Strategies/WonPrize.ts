import { IPrizeStrategy } from './IPrizeStrategy'

const clc = require('cli-color')

export class WonPrize implements IPrizeStrategy {
  prize_ratio: number = 3 / 2
  message: string = 'You won!'
  color: Function = clc.green
}