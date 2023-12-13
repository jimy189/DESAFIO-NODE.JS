import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
export default class AlunosController {
  public async index({}: HttpContextContract){
    return await Aluno.all();
  }

  public async show({request}: HttpContextContract){
    const aluno:Aluno|null = await Aluno.find(request.param('id'))
    return aluno
  }

  public async store({request}: HttpContextContract) {

    const aluno:Aluno = await Aluno.create(request.all());
    return aluno;
  }

  public async update({request}: HttpContextContract) {
    const aluno:Aluno|null = await Aluno.find(request.param('id'))
    aluno.nome = request.input('nome');
    aluno.email = request.input('email');
    aluno.matricula = request.input('matriculo');
    aluno.dataNascimento = request.input('dataNascimento')
    aluno.save();
    return aluno;
  }

  public async destroy({request}: HttpContextContract) {
    const aluno:Aluno|null = await Aluno.find(request.param('id'))
   aluno?.delete();
  }
}
