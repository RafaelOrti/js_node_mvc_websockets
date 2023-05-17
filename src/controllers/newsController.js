const News = require('../models/news');
const NewsController = {};


NewsController.getNews = async (req, res) => {
    //////TO DO///////
    // adapt endpoint for pagination instead of scrollable:
    //// const page = parseInt((req.query.page || 0).toString(), 10);
    //// const limit = parseInt((req.query.limit || 10).toString(), 10);
    //// .skip(page * limit).limit(limit)

    const filter = req.query.filter ? {archiveDate: { $exists: req.query.filter }} : {}
    const sortBy = req.query.filter === 'true' ?  {'archiveDate' : 'desc'} :  {'date' : 'desc'};

    try {
      await News.find(filter).sort(sortBy).exec((err, news) => {
        return err ? res.status(500).json(err) : res.status(200).json(news);
      });
    } catch (err) {
        return res.status(500).json(err)
    }

}

NewsController.createNew = async (req,res) => {

    if (!req.body.title) return res.status(400).json({mensaje:'No ha llegado el title'});
    if (!req.body.description) return res.status(400).json({mensaje:'No ha llegado el description'});
    if (!req.body.content) return res.status(400).json({mensaje:'No ha llegado el content'});
    if (!req.body.author) return res.status(400).json({mensaje:'No ha llegado el author'});

    const news = new News({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author
    })

    try {
      await news.save((err,news) => {
        return err ? res.status(500).json(err) : res.status(200).json(news);
      })
    } catch (err) {
        return res.status(500).json(err)
    }

}

NewsController.deleteNew = async (req,res) => {

    if (!req.params.id) return res.sendStatus(400);

    try {
        const news = await News.findById(req.params.id)
        if(news!=null){
            news.remove();
            return res.status(200).json({newsBorrado:news, mensaje:'Borrado con exito'});
        }
        return res.status(500).json({'mensaje': 'No existe un dato con ese ID'})
    } catch (err) {
        return res.status(500).json(err)
    }
}

NewsController.archiveNew = async (req,res) => {

    if (!req.params.id) return res.sendStatus(400);

    try{
        const news = await News.findByIdAndUpdate(req.params.id, { archiveDate: Date.now() });
        if(news!=null){
            return res.status(200).json({newsModificado:news, mensaje:'Modificado con exito'});
        }
        return res.status(500).json({'mensaje': 'No existe un dato con ese ID'}) // hacer control real
    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports = NewsController;















