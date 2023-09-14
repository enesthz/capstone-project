const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["FEMALE", "MALE", "NOT_SPECIFIED"] },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
});

const CustomerModel = mongoose.model("Customer", customerSchema);

const findCustomerById = async (id) => {
  return await CustomerModel.findById(new Types.ObjectId(id));
};

const findCustomerByEmail = async (email) => {
  return await CustomerModel.findOne({ email });
};

const addNewCustomer = async ({
  email,
  password,
  gender,
  name,
  surname,
  phone,
  address
}) => {
  return await CustomerModel.create({
    email,
    password,
    gender,
    name,
    surname,
    phone,
    address
  });
};

const deleteCustomerById = async (id) => {
  return await CustomerModel.deleteOne({ _id: new Types.ObjectId(id) });
};

const updateCustomerById = async (id, updatedFields) => {
  return await CustomerModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    updatedFields,
    { returnOriginal: false }
  );
};

const findCustomerByIds = async (ids) => {
  if (ids.length === 0) {
    return await CustomerModel.find();
  }
  const users = await CustomerModel.find({
    _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
  });

  const sortedUsers = ids.map((id) =>
    users.find((item) => item._id.equals(id))
  );

  return sortedUsers;
};

module.exports = {
  findCustomerByIds,
  updateCustomerById,
  deleteCustomerById,
  findCustomerByEmail,
  findCustomerById,
  addNewCustomer,
  CustomerModel,
};
