//  It's a higher order function. (a function is passed to another func)

// AsyncHandler = () => {}
// AsyncHandler = (func) => { () =>{} }
// AsyncHandler = (func) => async () => {}

const AsyncHandler = (fn) => async (err, req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(err.code || 400).json({
      success: false,
      message: err.message,
    });
  }
};

export { AsyncHandler };
