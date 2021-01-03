import mongoose from "mongoose";
let Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String,
});

const role = mongoose.model("Role", RoleSchema);

export default role;
