const Card = require('../models/card');

//get all cards
exports.cards_get_all = (req, res, next) => {
  Card.find({archived: false})
    .select('_id title content dueDays createDate dueDate progress type archived')
      .exec()
      .then(results => {
        console.log(results);
        const response = {
          count: results.length,
          cards: results.map(result => {
            return {
              id: result._id,
              title: result.title,
              content: result.content,
              dueDays: result.dueDays,
              createDate: result.createDate,
              dueDate: result.dueDate,
              progress: result.progress,
              type: result.type,
              archived: result.archived,
              request: {
                type: 'GET',
                url: 'http://localhost:4000/cards/' + result._id
              }

            }
          })
        }
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
}

// create new card
exports.create_new_card = (req, res, next) => {
  const card = new Card({
    content: req.body.content,
    createDate: req.body.createDate,
    dueDate: req.body.dueDate,
    dueDays: req.body.dueDays,
    progress: req.body.progress,
    title: req.body.title,
    type: req.body.type,
    archived: req.body.archived
  })
  card.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Created new card',
        createdCard: {
          id: result._id,
          title: req.body.title,
          content: req.body.content,
          dueDays: req.body.dueDays,
          createDate: req.body.createDate,
          dueDate: req.body.dueDate,
          progress: req.body.progress,
          type: req.body.type,
          archived: req.body.archived,
          request: {
            type: 'GET',
            url: 'http://localhost:4000/cards/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
}

// get card by Id
exports.get_cardById = (req, res, next) => {
  const id = req.params.cardId;
  console.log(id)
  Card.findById(id)
    .exec()
    .then(result => {
      console.log("From DataBase: ", result);
      if(result){
        res.status(200).json(result);
      } else {
        res.status(404).json({message: "No Valid entry found for provided ID"})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
}

// edit card by Id
exports.edit_cardById = (req, res, next) => {
  const id = req.params.cardId;
  
  Card.replaceOne({_id: id}, req.body)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Card updated',
        request: {
          type: 'GET',
          url: 'http://localhost:4000/cards/' + id,
          req: req.body
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      })
    })
}

// delete card by Id
exports.delete_cardById = (req, res, next) => {
  const id = req.params.cardId;
  Card.deleteOne({_id: id})
    .exec()
    .then(result => {
    res.status(200).json({
      request: {
        type: 'POST',
        url: 'http://localhost:4000/cards/',
      }
    });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

// delet all cards
exports.delete_all_cards = (req, res, next) => {
  Card.deleteMany({})
    .exec()
    .then(result => {
    res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

// get all archived cards
exports.get_archived_cards = (req, res, next) => {
  Card.find({ archived: true})
    .select('_id title content dueDays createDate dueDate progress type archived')
      .exec()
      .then(results => {
        console.log(results);
        const response = {
          count: results.length,
          cards: results.map(result => {
            return {
              id: result._id,
              title: result.title,
              content: result.content,
              dueDays: result.dueDays,
              createDate: result.createDate,
              dueDate: result.dueDate,
              progress: result.progress,
              type: result.type,
              archived: result.archived,
              request: {
                type: 'GET',
                url: 'http://localhost:4000/archive/' + result._id
              }

            }
          })
        }
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
}

// archive card
exports.patch_archive_card = (req, res, next) => {
  const id = req.params.cardId;
  Card.update({_id: id}, {$set: { archived: req.body.archived, progress: 100 , dueDays: 0 }})
    .exec()
    .then(result => {
    res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

// delete all archived cards
exports.delete_all_archived_cards = (req, res, next) => {
  Card.deleteMany({archived: true})
    .exec()
    .then(result => {
    res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}