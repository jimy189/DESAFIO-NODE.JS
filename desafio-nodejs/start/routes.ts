/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/aluno/list', 'AlunosController.index')
Route.get('/aluno/:id', 'AlunosController.show')
Route.post('/aluno/store', 'AlunosController.store')
Route.put('/aluno/:id', 'AlunosController.update')
Route.delete('/aluno/:id', 'AlunosController.destroy')

Route.get('/professor/list', 'ProfessorsController.index')
Route.get('/professor/:id', 'ProfessorsController.show')
Route.post('/professor/store', 'ProfessorsController.store')
Route.put('/professor/:id', 'ProfessorsController.update')
Route.delete('/professor/:id', 'ProfessorsController.destroy')

Route.get('/sala/list', 'SalasController.index')
Route.get('/sala/:id', 'SalasController.show')
Route.post('/sala/store', 'SalasController.store')
Route.put('/sala/:id', 'SalasController.update')
Route.delete('/sala/:id', 'SalasController.destroy')

Route.get('/sala/professor/list', 'SalaAlunosController.index')
Route.get('/sala/aluno/list/:id', 'SalaAlunosController.show')
Route.post('/sala/aluno/store', 'SalaAlunosController.store')
Route.delete('/sala/aluno/:alunoId/:salaId', 'SalaAlunosController.destroy')
Route.get('/sala/aluno/search/:id', 'SalaAlunosController.search')
