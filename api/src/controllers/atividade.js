const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: req.body
        });
        res.status(201).json(atividade);
    } catch (error) {
        if (error.code == 'P2003')
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        else
            res.status(400).json(error);
    }
};

const read = async (req, res) => {
    const atividades = await prisma.atividade.findMany();
    res.status(200).json(atividades);
};

const readOne = async (req, res) => {
    try {
        const atividade = await prisma.atividade.findUnique({
            select: {
                id: true,
                nome: true,
               aluno_ra: true,
               data_inicio: true,
                data_entrega: true,
                    nota: {
                       peso: {
                    }
                },
                leciona: {
                    select: {
                        nome: true
                    }
                },
                matriculas: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const atividade = await prisma.atividade.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.atividade.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};