const polls = require('../data/polls');

const getPolls = (req,res) => {
  res.status(200).json({
    message:"Polls retrieved Successfully",
    polls:polls
  });
};

const getPollById = (req,res) => {
  const id = Number(req.params.id);
  const poll = polls.find(poll => poll.id === id);
  if(!poll){
    return res.status(404).json({
      message:"Poll not Found"
    });
  }

  res.status(200).json({
    poll:poll
  })
};

const vote = (req,res) => {
  const {pollId, optionId} = req.body;

  if(pollId === undefined || optionId === undefined){
    return res.status(400).json({
      message:"pollId and optionId are required"
    });
  }

  const poll = polls.find(poll => poll.id === Number(pollId));
  if(!poll){
    return res.status(404).json({
      message:"Poll not found"
    });
  }
  const option = poll.options.find(option => option.id === optionId);
  if(!option){
    return res.status(400).json({
      message:"Invalid Option"
    });
  }

  option.count++;
  res.status(200).json({
    message:"Vote Recorded Successfully",
    poll:poll
  });
};

const getResults = (req,res) => {
  const id = Number(req.params.id);

  const poll = polls.find(poll => poll.id === id);
  if(!poll){
    return res.status(404).json({
      message:"Poll not found"
    });
  }

  const totalResponses = poll.options.reduce((total,option) => total+option.count,0);

  const results = poll.options.map((option) => ({
    optionId:option.id,
    option:option.text,
    count:option.count
  }));

  res.status(200).json({
    pollId:id,
    question:poll.question,
    results:results,
    totalResponses:totalResponses
  });
};

module.exports = {
  getPolls,
  getPollById,
  vote,
  getResults
};