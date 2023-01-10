// продолжение шага #3, а тут создаем схему только уже для роли: user, admin, moderator

const { Schema, model } = require('mongoose')

const Role = new Schema({
  value: { type: String, unique: true, default: 'USER' },
  // в одном поле value будем хранить эти роли, по default эта роль будет USER
})

module.exports = model('Role', Role)
