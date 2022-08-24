const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  validateURL,
} = require('../middlewares/validation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

router.get('/', getCards);

router.delete(
  '/:cardId',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
  dislikeCard,
);

module.exports = router;
