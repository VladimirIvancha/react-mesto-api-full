const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserMe,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateURL,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get(
  '/:userId',
  celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24) }) }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate(
    {
      body: Joi.object({ avatar: Joi.string().custom(validateURL) }),
    },
  ),
  updateAvatar,
);

module.exports = router;
