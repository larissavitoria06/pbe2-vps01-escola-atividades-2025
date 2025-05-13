const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const aluno = await prisma.aluno.create({
      data: req.body,
    });
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    console.log('Fetching alunos...');
    const alunos = await prisma.aluno.findMany();
    console.log('Alunos:', alunos);
    return res.json(alunos);
  } catch (error) {
    console.error('Error fetching alunos:', error);
    return res.status(500).json({ error: error.message });
  }
};

const readOne = async (req, res) => {
  try {
    const ra = isNaN(req.params.ra) ? req.params.ra : Number(req.params.ra);
    const aluno = await prisma.aluno.findUnique({
      select: {
        ra: true,
        nome: true,
        email: true,
        numero: true,
        tipo: true,
      },
      where: {
        ra,
      },
    });
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    return res.json(aluno);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const ra = req.params.ra;

   
    const alunoExistente = await prisma.aluno.findUnique({
      where: { ra },
    });

    if (!alunoExistente) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    
    if (req.body.ra && req.body.ra !== ra) {
      return res.status(400).json({ error: 'Não é permitido alterar o RA' });
    }

   
    if (req.body.email) {
      const emailExistente = await prisma.aluno.findUnique({
        where: { email: req.body.email },
      });
      if (emailExistente) {
        return res.status(400).json({ error: 'E-mail já está em uso' });
      }
    }

  
    if (req.body.numero) {
      const numeroExistente = await prisma.aluno.findUnique({
        where: { numero: req.body.numero },
      });
      if (numeroExistente) {
        return res.status(400).json({ error: 'Número já está em uso' });
      }
    }

    const aluno = await prisma.aluno.update({
      where: { ra },
      data: req.body,
    });

    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    console.log(req.params);  

    const ra = (req.params.ra) ? req.params.ra : Number(req.params.ra);
    await prisma.aluno.delete({
      where: {
        ra,
      },
    });
    return res.status(204).send(); 
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};


module.exports = { create, read, readOne, update, remove };
