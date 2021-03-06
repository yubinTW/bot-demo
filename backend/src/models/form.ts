import mongoose from 'mongoose'
import { IForm } from '../types/form'

const formSchema = new mongoose.Schema(
  {
    computerName: { type: String, required: true },
    username: { type: String },
    status: { type: String, default: 'new' }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IForm>('Form', formSchema)
