// 1. Importando Mongoose
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import uniqueValidator from 'mongoose-unique-validator';
// 2. Desestructurando la fn Schema
const { Schema } = mongoose;
// 3. Creando el esquema
const UserSchema = new Schema(
  {
    nombre: { type: String, required: true },
    matricula: { type: Number, required: true },
    grado: { type: String, required: true },
    seccion: { type: String, required: true },
    correo: {
      type: String,
      unique: true,
      required: [true, 'Es necesario ingresar email'],
      validate: {
        validator(correo) {
          // eslint-disable-next-line no-useless-escape
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(correo);
        },
        message: `{VALUE} noes un email valido`,
      },
    },
    contrasena: {
      type: String,
      required: [true, 'Es necesario ingresar password'],
      trim: true,
      minLength: [6, 'Password debe ser de al menos 6 caracteres'],
      validate: {
        validator(password) {
          if (process.env.NODE_ENV === 'development') {
            // Sin validacion rigurosa en Dev
            return true;
          }
          return validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          });
        },
        message: 'Es necesario ingresar un password fuerte',
      },
    },
    emailConfirmationToken: String,
    emailConfirmationAt: Date,
  },
  { timestamps: true },
);

// Asignando metodos de instancia
UserSchema.methods = {
  // Metodo para encriptar el password
  hashPassword() {
    return bcrypt.hashSync(this.contrasena, 10);
  },
  // Genera un token de 64 caracteres aleatorios
  generateConfirmationToken() {
    return crypto.randomBytes(64).toString('hex');
  },
  // Funcion de tranformacion a Json personalizada
  toJSON() {
    return {
      id: this._id,
      nombre: this.nombre,
      matricula: this.matricula,
      grado: this.grado,
      seccion: this.seccion,
      contrasena: this.contrasena,
      emailConfirmationToken: this.emailConfirmationToken,
      emailConfirmationAt: this.emailConfirmationAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

// Adding Plugins to Schema
UserSchema.plugin(uniqueValidator);

// Hooks
UserSchema.pre('save', function presave(next) {
  // Encriptar el password
  if (this.isModified('contrasena')) {
    this.contrasena = this.hashPassword();
  }
  return next();
});

// 4. Compilando el modelo y exportandolo
export default mongoose.model('usuarios', UserSchema);
