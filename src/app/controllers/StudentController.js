import * as yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            email: yup
                .string()
                .required()
                .email(),
            idade: yup
                .number()
                .integer()
                .required()
                .positive(),
            peso: yup.number().required(),
            altura: yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ message: 'Erro de validação!', body: req.body });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        const { nome, email, idade, peso, altura } = await Student.create(
            req.body
        );

        return res.json({
            message: 'Cadastrado com sucesso!',
            student: { nome, email, idade, peso, altura },
        });
    }

    async update(req, res) {}
}

export default new StudentController();
