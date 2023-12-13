import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala';
export default class SalasController {
  public async index({}: HttpContextContract){
    return await Sala.all();
  }

  public async show({request}: HttpContextContract){
    const sala:Sala|null = await Sala.find(request.param('id'))
    return sala
  }

  public async store({request}: HttpContextContract) {

    const sala:Sala = await Sala.create(request.all());
    return sala;
  }

  public async update({request}: HttpContextContract) {
    const sala:Sala|null = await Sala.find(request.param('id'))
    sala.numeroSala = request.input('numeroSala');
    sala.professor = request.input('professor');
    sala.capacidadeAlunos = request.input('capacidadeAlunos');
    sala.disponibilidade = request.input('disponibilidade')
    sala.save();
    return sala;
  }

  public async destroy({request}: HttpContextContract) {
    const sala:Sala|null = await Sala.find(request.param('id'))
    sala?.delete();
  }
}
