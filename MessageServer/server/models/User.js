import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
	token: {
		type: String,
		default: '0'
	},
	loggedIn: {
		type: Boolean,
		default: false
	},
	firstName: String,
	lastName: String,
	phoneNumber: String,
	emailAddress: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', (next) => {
	if (!this.isModified('password')) return next();
	return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err);
		return bcrypt.hash(this.password, salt, (_err, hash) => {
			if (_err) return next(_err);
			this.password = hash;
			return next();
		});
	});
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		return cb(null, isMatch);
	});
};

module.exports = mongoose.model('Users', UserSchema);
