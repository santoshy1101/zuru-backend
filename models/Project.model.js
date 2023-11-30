const { default: mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  links: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

const Project = mongoose.model("projects", projectSchema);

module.exports = {
  Project,
};
