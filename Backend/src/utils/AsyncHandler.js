//  It's a higher order function. (a function is passed to another func)

// AsyncHandler = () => {}
// AsyncHandler = (func) => { () =>{} }
// AsyncHandler = (func) => async () => {}

// Wrapper function. Why? --> We have to contact database again and again for Api responses. We can't write the same type of code(async await) again and again. So we create a wrapper function.
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
