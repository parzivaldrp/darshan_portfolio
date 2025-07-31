import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gitLink: {
    type: String,
    required: false,
    default: '',
    validate: {
      validator: function(v) {
        return v === '' || /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'GitHub link must be a valid URL or empty'
    }
  },
  liveLink: {
    type: String,
    required: false,
    default: '',
    validate: {
      validator: function(v) {
        return v === '' || /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Live link must be a valid URL or empty'
    }
  },
  techStack: {
    type: [String],
    required: true,
  },
  image: [{ type: String }],
  schemaVersion: { type: Number, default: 2 } // Force schema refresh
  
}, { timestamps: true });

// Clear any existing model to force schema refresh
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const Project = mongoose.model('Project', projectSchema);

export default Project;


