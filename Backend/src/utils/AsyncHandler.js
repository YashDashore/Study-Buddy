//  It's a higher order function. (a function is passed to another func)

// AsyncHandler = () => {}
// AsyncHandler = (func) => { () =>{} }
// AsyncHandler = (func) => async () => {}

// Wrapper function. Why? --> We have to contact database again and again for Api responses. We can't write the same type of code(async await) again and again. So we create a wrapper function.
const AsyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    // res.status(error.code || 400).json({
    //   success: false,
    //   message: error.message,
    // });
    next(error)
  }
};

export { AsyncHandler };
