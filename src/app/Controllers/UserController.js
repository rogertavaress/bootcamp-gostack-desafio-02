import * as Yup from 'yup';
import User from '../Models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ message: 'Falha na validação!' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, password) => {
                    return oldPassword ? password.required() : password;
                }),
            confirmPassword: Yup.string().when(
                'password',
                (password, confirmPassword) => {
                    return password
                        ? confirmPassword
                              .required()
                              .oneOf([Yup.ref('password')])
                        : password;
                }
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.id);

        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return res.status(401).json({ error: 'User already exists.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match.' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.status(200).json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();
