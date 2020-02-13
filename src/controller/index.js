const { NODE_ENV } = process.env
const table = `students_${NODE_ENV}`


const { queryHelper, updateFormatter, insertFormatter } = require('../../db/helper')

const getAll = async (request, response) => {
    const sql = `SELECT * FROM ${table}`
    const data = await queryHelper(sql)
    response.status(200).json(data)
}

const getById = async (request, response) => {

    const sql = `SELECT * FROM ${table} WHERE id=${request.params.studentId}`
    const data = await queryHelper(sql)
    if (data.length == 0) {
      return response.status(404).json({ error: 'Student not exists' })
    }
    response.status(200).json(data) 
  }
  
const create = async (request, response) => {
    // Implemente o método correspondete a rota POST /v1/students
    const sql = `INSERT INTO ${table} (${insertFormatter(request.body).columns}) VALUES(${insertFormatter(request.body).values})`
    await queryHelper(sql)
  
    response.status(201).json({ success: 'A new record has been created.' })
  }
  
const updateById = async (request, response) => {
    // Implemente o método correspondete a rota PATCH /v1/students/:id
    const sql = `UPDATE ${table} SET ${updateFormatter(request.body)} WHERE id=${request.params.studentId}`
    const data = await queryHelper(sql)
    if (data.affectedRows < 1){
      return response.status(404).json({error : 'Student not exists'})
    }
    response.status(200).json({ success: 'The record has been updated.' })
  }
  
const deleteById = async (request, response) => {
    // Implemente o método correspondete a rota DELETE /v1/students/:id
    const idReq = request.params.studentId
    const sql = `DELETE FROM ${table} WHERE id=${idReq}`
    const data = await queryHelper(sql)
    if (data.affectedRows < 1){
      return response.status(404).json({error : 'Student not exists'})
    }
  
    response.status(204).json({})
  }

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}