const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    title: {type: String, require: true},
    category: {type: String, enum: ["Agricultura", "Negócios", "Educação", "Entretenimento", "Arte", "Investimento", "Sem Categoria", "Meteorologia"], message: "VALOR não suportado"},
    desc: {type: String, require: true},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    thumbnail: {type: String, require: true},
}, {timestamps: true})

module.exports = model("Post", postSchema);