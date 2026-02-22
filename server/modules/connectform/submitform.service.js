const ConnectForm = require("./submitform.model");

const submitform = async (data) => {
    console.log("Received data in submitform service:", data);
  const result = await ConnectForm.create(data);

//   await result.populate("userid");

  return result;
};


module.exports = {submitform};
