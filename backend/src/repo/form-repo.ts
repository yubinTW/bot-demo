import { IForm } from './../types/form'
import Form from './../models/form'

interface FormRepo {
  getForms(): Promise<Array<IForm>>
  getForm(id: string): Promise<IForm | null>
  addForm(formBody: IForm): Promise<IForm>
  updateForm(id: string, formBody: IForm): Promise<IForm | null>
  deleteForm(id: string): Promise<IForm | null>
}

class FormRepoImpl implements FormRepo {
  private constructor() {}

  static of(): FormRepoImpl {
    return new FormRepoImpl()
  }

  async getForms(): Promise<Array<IForm>> {
    return Form.find()
  }

  async getForm(id: string): Promise<IForm | null> {
    return Form.findById(id)
  }

  async addForm(formBody: IForm): Promise<IForm> {
    return Form.create(formBody)
  }

  async updateForm(id: string, formBody: IForm): Promise<IForm | null> {
    return Form.findByIdAndUpdate(id, formBody, { new: true })
  }

  async deleteForm(id: string): Promise<IForm | null> {
    return Form.findByIdAndDelete(id)
  }
}

export { FormRepoImpl }
