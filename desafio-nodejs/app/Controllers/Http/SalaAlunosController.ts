import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classe from 'App/Models/Classe';
import Sala from 'App/Models/Sala';
import Aluno from 'App/Models/Aluno';
import Professor from 'App/Models/Professor';
export default class SalaAlunosController {
  public async index({}: HttpContextContract){
    return await Classe.all();
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const salaId = request.param('id');

      // Encontra todas as classes associadas à sala
      const classes: Classe[] = await Classe.query().where('salaId', salaId);

      if (!classes.length) {
        return response.status(404).json({ message: 'Nenhuma classe encontrada para esta sala' });
      }

      // Encontra os nomes dos alunos associados às classes
      const Alunos: string[] = await Promise.all(
        classes.map(async (classe) => {
          const aluno: Aluno | null = await Aluno.find(classe.alunoId);
          return aluno?.nome || ''; // Retorna o nome do aluno ou uma string vazia se não encontrado
        })
      );

      return response.json({ Alunos });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  public async search({ request, response }: HttpContextContract) {
    try {
      const alunoId = request.param('id');
      let resultados: any[] = [];

      // Verifica se o aluno existe
      const aluno: Classe[] = await Classe.query().where('alunoId', alunoId);

      if (!aluno.length) {
        return response.status(404).json({ message: 'Aluno não encontrado' });
      }

      for (const alunosEnco of aluno) {
        const alunoEncontrado: Aluno | null = await Aluno.query().where('id', alunoId).first();
        const professor: Professor | null = await Professor.query().where('id', alunosEnco.professorId).first();
        const sala: Sala | null = await Sala.query().where('id', alunosEnco.salaId).first();

        const resultado = {
          nome_aluno: alunoEncontrado?.nome,
          salas: [
            {
              numeroSala: sala?.numeroSala?.toString(),
              nomeProfessor: professor?.nome,
            },
          ],
        };

        resultados.push(resultado);
      }

      return response.json(resultados);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro interno no servidor' });
    }
  }


  public async store({request, response}: HttpContextContract) {
    //const classe:Classe|null = await Classe.find(request.input('alunoId'))
    const alunoId = request.input('alunoId');
    const salaId = request.input('salaId');
    const alunoExistente: Classe | null = await Classe.query().where('alunoId', alunoId).andWhere('salaId', salaId).first();
    if(alunoExistente){
      return response.status(400).json({
        message: 'A sala não pode possuir o mesmo aluno mais de uma vez.',
      });
  }
    const sala:Sala|null = await Sala.find(request.input('salaId'))
    if(sala?.capacidadeAlunos === 0){
      return response.status(400).json({
        message: 'A sala não pode exceder sua capacidade de alunos.',
      });
  }

  const professorId = request.input('professorId');
  const professor: Sala | null = await Sala.query().where('professor', professorId).first();
  if(!professor){
    return response.status(400).json({
      message: 'O professor não poderá alocar um aluno para uma sala que não tenha sido criada por ele.',
    });
}
    sala.capacidadeAlunos = sala.capacidadeAlunos-1;
    sala.save();
    const classeSalva:Classe = await Classe.create(request.all());
    return classeSalva;
  }

  public async destroy({ request, response }: HttpContextContract) {
    const alunoId = request.param('alunoId');
    const salaId = request.param('salaId');

    // Encontra todas as classes que você deseja excluir
    const classes: Classe[] = await Classe.query()
      .where('alunoId', alunoId)
      .andWhere('salaId', salaId);

    if (!classes.length) {
      return response.status(404).json({ message: 'Nenhuma classe encontrada para exclusão' });
    }

    // Deleta cada classe individualmente
    for (const classe of classes) {
      await classe.delete();
    }

    return response.status(200).json({ message: 'Classes deletadas com sucesso' });
  }
}
