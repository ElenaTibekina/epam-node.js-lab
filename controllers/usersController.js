exports.getAllUsers = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

// const User = require('../schemas/user');

// function response(res, code, status, data) {
//   res.status(code).json({
//     status: status,
//     ...data,
//   });
// }

// function responseFail(res, errorMessage) {
//   response(res, 500, 'bad request', { message: errorMessage });
// }

// function responseBad(res, errorMessage) {
//   response(res, 404, 'failed', { message: errorMessage });
// }

// function responseUser(res, user) {
//   response(res, 200, 'success', { data: { user: user } });
// }

// function responseUsers(res, users) {
//   response(res, 200, 'success', {
//     results: users.length,
//     data: { users: users },
//   });
// }

// function responseUserCreated(res, user) {
//   response(res, 201, 'success', { data: { user: user } });
// }

// function responseUserDeleted(res, user) {
//   response(res, 204, 'success', { data: { user: user } });
// }

// exports.getAllUsers = (req, res) => {
//   const name = req.query.name;
//   let query;
//   if (name) {
//     query = User.find({ name });
//   } else {
//     query = User.find({});
//   }
//   query.exec((err, users) => {
//     if (err) {
//       responseFail(res, 'Bad request');
//     }
//     responseUsers(res, users);
//   });
// };

// exports.getUserById = (req, res) => {
//   const id = req.params.id;
//   const query = User.findById(id);
//   query.exec((err, user) => {
//     if (err) {
//       responseFail(res, 'Bad request');
//     } else if (!user) {
//       responseBad(res, 'invalid ID');
//     }
//     responseUser(res, user);
//   });
// };

// exports.createNewUser = (req, res) => {
//   const newUser = {
//     name: '',
//     damage: '',
//     isCaught: '',
//     createdAt: '',
//     ...req.body,
//   };
//   User.create(newUser, (err, user) => {
//     if (err) {
//       responseFail(res, 'Bad request');
//     }
//     responseUserCreated(res, user);
//   });
// };

// exports.updateUser = (req, res) => {
//   const id = req.params.id;
//   const newUser = {
//     ...req.body,
//   };
//   const query = User.findByIdAndUpdate(id, newUser, { new: true });
//   query.exec((err, user) => {
//     if (err) {
//       return responseFail(res, 'Bad request');
//     } else if (!user) {
//       return responseBad(res, 'invalid ID');
//     }
//     responseUser(res, user);
//   });
// };

// exports.deleteUser = (req, res) => {
//   const id = req.params.id;
//   const query = User.findByIdAndDelete(id);
//   query.exec((err, user) => {
//     if (err) {
//       return responseFail(res, 'bad request');
//     }
//     if (!user) {
//       return responseFail(res, 'invalid id');
//     }
//     responseUserDeleted(res, null);
//   });
// };
