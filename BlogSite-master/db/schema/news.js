var mongoose = require('../db');
var Schema = mongoose.Schema;


/* 用户定义 */
var newsSchema = new Schema({
    title: String,
    newThumb: String,
    content: String,
    pv: {
        type: Number,
        default: 0
    },
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

newsSchema.pre('save', function (next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
})


module.exports = mongoose.model('News', newsSchema);
