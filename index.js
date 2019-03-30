const { send, json } = require('micro')
const cors = require('micro-cors')()
const { router, get, post, put, del } = require('microrouter')

const monk = require('monk')
const db = monk('mongodb://Jomullen11:Jdogjdog@cluster0-shard-00-00-pmle5.mongodb.net:27017,cluster0-shard-00-01-pmle5.mongodb.net:27017,cluster0-shard-00-02-pmle5.mongodb.net:27017/CRUD?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
const read =  db.get('example')

const getRead = async (req, res) => {
    const results = await read.find({})
    return send(res, 200, results)
}

const postCreate = async (req, res) => {
    const data = await json(req)
    const results = await read.insert(data)
    return send(res, 201, results)
}

const putUpdate = async (req, res) => {
        const data = await json(req)
        console.log(data)
        const results = await read.update({_id: req.params.id},data)
        return send(res, 200, results)
    }

const delDelete = async (req, res) => {
    const results = await read.remove({ _id: req.params.id})
    return send(res, 202, results)
}

const notFound = (req, res) => send(res, 404, "Looks like you're a little stuck")

module.exports = cors(
    router (
        get('/read', getRead),
        post('/info', postCreate),
        del('/info/:id', delDelete),
        put('/info/:id', putUpdate),
        get('/*', notFound)
    )
)