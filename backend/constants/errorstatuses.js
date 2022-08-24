const errorstatuses = {
  ok: 200,
  created: 201,
  BadReqErrMessage: 'Переданы некорректные данные',
  NotFoundCardErrMessage: 'Карточка не найдена',
  NotFoundUserErrMessage: 'Пользователь не найден',
  NotFoundPageErrMessage: 'Страница не найдена',
  ConflictErrMessage: 'Пользователь с таким Email уже существует',
  UnAuthorizedErrMessage: 'Неверный email или пароль',
  NeedAuthorizeErrMessage: 'Необходима авторизация',
  ForbiddenErrMessage: 'Нельзя удалять карточки других',
  WrongURLFormatMessage: 'Неправильный формат ссылки',
};

module.exports = errorstatuses;
