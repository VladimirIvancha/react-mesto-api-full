const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const {
  ok,
  created,
  BadReqErrMessage,
  NotFoundCardErrMessage,
  ForbiddenErrMessage,
} = require('../constants/errorstatuses');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(NotFoundCardErrMessage))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenErr(ForbiddenErrMessage));
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.status(ok).send({ message: 'Карточка удалена' })
            .catch(next); // попробую так, а то eslint ругается на return
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NotFoundCardErrMessage))
    .then((card) => {
      res.status(ok).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NotFoundCardErrMessage))
    .then((card) => {
      res.status(ok).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};
