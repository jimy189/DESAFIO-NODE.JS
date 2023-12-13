import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
export default class ProfessorsController {
  public async index({}: HttpContextContract){
    return await Professor.all();
  }

  public async show({request}: HttpContextContract){
    const professor:Professor|null = await Professor.find(request.param('id'))
    return professor
  }

  public async store({request}: HttpContextContract) {

    const professor:Professor = await Professor.create(request.all());
    return professor;
  }

  public async update({request}: HttpContextContract) {
    const professor:Professor|null = await Professor.find(request.param('id'))
    professor.nome = request.input('nome');
    professor.email = request.input('email');
    professor.matricula = request.input('matriculo');
    professor.dataNascimento = request.input('dataNascimento')
    professor.save();
    return professor;
  }

  public async destroy({request}: HttpContextContract) {
    const professor:Professor|null = await Professor.find(request.param('id'))
    professor?.delete();
  }
}
