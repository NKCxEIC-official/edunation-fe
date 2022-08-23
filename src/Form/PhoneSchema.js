import * as Yup from 'yup';
import 'yup-phone';

export const phoneSchema = Yup.string().phone().required();
