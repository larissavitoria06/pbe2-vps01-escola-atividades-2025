const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        });
        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        return res.json(alunos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const readOne = async (req, res) => {
    try {
        const ra = isNaN(req.params.ra) ? req.params.ra : Number(req.params.ra);
        const aluno = await prisma.aluno.findUnique({
            select: {
                ra: true,
                nome: true,
                email: true,
                numero: true,
                tipo: true
            },
            where: {
                ra
            }
        });
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        return res.json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const ra = isNaN(req.params.ra) ? req.params.ra : Number(req.params.ra);
        const aluno = await prisma.aluno.update({
            where: {
                ra
            },
            data: req.body
        });
        return res.status(202).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const ra = isNaN(req.params.ra) ? req.params.ra : Number(req.params.ra);
        await prisma.aluno.delete({
            where: {
                ra
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };
