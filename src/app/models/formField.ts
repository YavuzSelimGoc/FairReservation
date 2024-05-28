import { FormFieldOption } from "./formFieldOption";

export interface FormField {
    fieldId: number;
    fieldType: string;
    fieldName: string;
    options?: FormFieldOption[];
  }