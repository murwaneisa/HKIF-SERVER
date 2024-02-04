const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken')

const SALT_ROUNDS = 10

exports.registerAdmin = async (req, res) => {
  try {
    if (req.body.role && req.body.role.includes('SUPERADMIN')) {
      return res.status(403).json({ message: 'Cannot register as SUPERADMIN' })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const newAdmin = new Admin({
      ...req.body,
      password: hashedPassword,
    })
    await newAdmin.save()
    res.status(201).json({ message: 'Admin registered successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const accessToken = generateAccessToken(admin, 'admin')
    const refreshToken = generateRefreshToken(admin, 'admin')
    admin.refreshToken = refreshToken
    await admin.save()
    res.json({ adminId: admin._id, access: accessToken, refresh: refreshToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.editAdmin = async (req, res) => {
  try {
    const adminId = req.params.id
    const updates = req.body

    const admin = await Admin.findById(adminId)
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    if (updates.currentPassword && updates.newPassword) {
      // Verify the current password
      const isMatch = await bcrypt.compare(
        updates.currentPassword,
        admin.password
      )
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: 'Current password is incorrect' })
      }

      // Hash the new password and update it
      const hashedPassword = await bcrypt.hash(updates.newPassword, SALT_ROUNDS)
      updates.password = hashedPassword
    }

    // Remove currentPassword and newPassword from updates to avoid saving them as fields
    delete updates.currentPassword
    delete updates.newPassword

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    })
    res.json({ message: 'Admin updated successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({})
      .select('-password')
      .select('-refreshToken')
    return res.status(200).json(admins)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .select('-password')
      .select('-refreshToken')
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }
    // If admin or same admin, return all data
    return res.status(200).json(admin)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getAdminContacts = async (req, res) => {
  try {
    const admins = await Admin.find()
    const limitedAdmins = admins.map(admin => {
      return {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        phoneNumber: admin.phoneNumber || null,
        role: admin.role,
        imageUrl: admin.imageUrl,
      }
    })

    return res.status(200).json(limitedAdmins)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.getAdminContactById = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id })
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }
    const adminLimitedInfo = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phoneNumber: admin.phoneNumber || null,
      role: admin.role,
      imageUrl: admin.imageUrl,
    }

    return res.status(200).json(adminLimitedInfo)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
