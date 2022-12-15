export interface IPrizeStrategy {

  // коэффициент выигрыша
  // если у игрока больше очков или у дилера перебор, то 3/2,
  // если поровну, то 1/1,
  // если меньше или перебор то проигрыш
  prize_ratio: number
  message: string

  // цвет сообщения в консоли
  color: Function
}