import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import User, { schema } from '../../api/user/model'
import {WRONG_USER,MISSING_FIELDS,UNAUTH} from '../../constants/constants'

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json({message:MISSING_FIELDS,error:err})
    } else if (err || !user) {
      return res.status(401).end({message:WRONG_USER})
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).json({message:UNAUTH}).end()
      next()
    })
  })(req, res, next)

export const otp = () => (req, res, next) =>
  passport.authenticate('otp', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json({message:MISSING_FIELDS,error:err})
    } else if (err || !user) {
      return res.status(401).json({message:UNAUTH}).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).json({message:UNAUTH}).end()
      next()
    })
  })(req, res, next)  

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).json({message:UNAUTH}).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).json({message:UNAUTH}).end()
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy((email, password, done) => {
  const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

  userSchema.validate({ email, password }, (err) => {
    if (err) done(err)
  })

  User.findOne({ email }).populate('roleId').then((user) => {
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password, user.password).then((user) => {
      done(null, user)
      return null
    }).catch(done)
  })
}))

passport.use('otp', new BasicStrategy((email, otp, done) => {
  const userSchema = new Schema({ email: schema.tree.email, otp: schema.tree.otp })

  userSchema.validate({ email, otp }, (err) => {
    if (err) done(err)
  })

  User.findOne({ email, otp }).then((user) => {
    if (!user) {
      done(true)
      return null
    }
    done(null, user);
    //console.log(user.authenticateOtp(email, otp));
    // return user.authenticateOtp(email, otp) ? done(null, user):done(null, null);
  })
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  User.findById(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
