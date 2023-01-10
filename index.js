const express = require('express')

const mongoose = require('mongoose')
// импортируем пакет монгуст который мы импортировали в самом начале

const authRouter = require('./authRouter')
// импортируем роутер authRouter в index.js

const PORT = process.env.PORT || 8888

const app = express()
// создадим из функции express само наше приложение, наш сервер

app.use(express.json())
// здесь мы заставляем наш эксапресс сервер парсить json который будет прилетать к нам в запросах

app.use('/auth', authRouter)
// нашему приложению необходимо указать чтобы оно этот роутер прослушивало, в функции use первым параметром указываем url- '/auth'
// по которому этот роутер будет слушаться, и вторым параметорм передаем сам роутер

const start = async () => {
  try {
    await mongoose.connect(
      `сюда вставляем url для подключения к вашей бд монго с сайта монго. В этом url указываем свой там созданный пароль, и созданное там название вашей бд`
    ) // подключаемся к нашей бд через функцию connect, все операции с бд ассинхронны, поэтому async await

    app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
// запуск созданного сервера с помощью созданной функции start
