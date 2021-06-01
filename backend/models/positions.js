const { Positions }  = require('../utils/db');

const addPosition = (data) => {
  const position = new Positions(data);
  return position.save();
}

const findPositionList = () => {
  return Positions.find({}).sort({ createTime: -1 });
}

const deletePosition = id => {
  return Positions.deleteOne({ _id: id });
}

const updatePosition = (data) => {
  return Positions.findByIdAndUpdate(data.id, data);
}

exports.addPosition = addPosition;
exports.findPositionList = findPositionList;
exports.deletePosition = deletePosition;
exports.updatePosition = updatePosition;