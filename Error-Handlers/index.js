exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};

exports.handle400s = (err, req, res, next) => {
  if (err.code == "22P02" || err.code == "42703") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "in the 500");
  res.status(500).send({ msg: "internal server error" });
};
