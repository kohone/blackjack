const { prompt } = require('enquirer')
import { HitStandEnum } from './Enum/HitStandEnum'

export class Dialog {

  // спрашиваем нужна ли еще карта
  static async hitStand (): Promise<HitStandEnum> {

    const answer = await prompt({
      type: 'select',
      name: 'turn',
      message: 'Your turn',
      choices: [HitStandEnum.hit, HitStandEnum.stand]
    })

    return answer.turn
  }

  static async getBet (): Promise<number> {
    let answer = await prompt({
      type: 'Numeral',
      name: 'bet',
      message: 'Your bet',
      enabled: false
    })

    return answer.bet
  }
}