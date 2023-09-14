const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require("bcrypt");
const employeeSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["FEMALE", "MALE", "NOT_SPECIFIED"] },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

const addNewEmployee = async ({
  name,
  surname,
  email,
  gender,
  phone,
  password,
  address,
}) => {
  return await EmployeeModel.create({
    name,
    surname,
    email,
    gender,
    phone,
    password,
    address,
  });
};

const findEmployeeById = async (id) => {
  return await EmployeeModel.findById(new Types.ObjectId(id));
};

const findEmployeeByEmail = async (email) => {
  return await EmployeeModel.findOne({ email });
};

const deleteEmployeeById = async (id) => {
  return await EmployeeModel.deleteOne({ _id: new Types.ObjectId(id) });
};

const updateEmployeeById = async (id, updatedFields) => {
  return await EmployeeModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    updatedFields,
    { returnOriginal: false }
  );
};

const findEmployeeByIds = async (ids) => {
  if (ids.length === 0) {
    return await EmployeeModel.find();
  }

  const usres = await EmployeeModel.find({
    _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
  });

  const sortedUsers = ids.mao((id) =>
    usres.find((item) => item._id.equals(id))
  );

  return sortedUsers;
};
employeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};
module.exports = {
  findEmployeeByIds,
  updateEmployeeById,
  deleteEmployeeById,
  findEmployeeByEmail,
  findEmployeeById,
  addNewEmployee,
  EmployeeModel,
};
