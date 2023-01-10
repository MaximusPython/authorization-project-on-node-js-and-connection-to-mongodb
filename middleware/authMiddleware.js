// #4 создаем функцию middleware для того чтобы давать доступ к той или иной функции только авторизованным пользователям
// после ее создания мы импортируем ее в файл authRouter, для функции get users

const jwt = require('jsonwebtoken')
// импортируем сюда сам модуль токена

const { secret } = require('../config')
// этот секретный ключ (не весь файл) тоже импортируем сюда через деструктиризацию

module.exports = function (req, res, next) {
  // функция middleware принимает три параметра, функция next вызывает по цепочки след middleware (их может быть несколько)

  if (req.method === 'OPTIONS') {
    next()
    // если метод равен 'OPTIONS' то мы вызываем след по цепочки middleware. нам нужны методы get, post

    try {
      const token = req.headers.authorization.split(' ')[1]
      // вытаскиваем токен из заголовка headers, нас интересует сам токен а не его тип поэтому берем только его вторую часть [1]

      if (!token) {
        // если токена нет то пишем ошибку
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }

      const decodedData = jwt.verify(token, secret)
      // если токен прилетел то нам надо его декодировать. у токена jwt есть метод verify(которому нужно передать token и secret ключ)
      // теперь в переменной decodedData лежит обьект с id и с ролями пользователями (paylod)

      req.user = decodedData
      // чтобы эти данные мы могли использовать внутри других функций, мы в запросе создаем новое поле user и туда добавляем эти данные
      next()
      // далее вызывем функцию next для вызова следующего по цепочки middleware
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
  }
}
