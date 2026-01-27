import { Response, Request } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/errors';

export const authRegister = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, phone, roleName = 'STUDENT' } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists', 400, 'USER_EXISTS');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Get role
    let role = await Role.findOne({ name: roleName });
    if (!role) {
      throw new AppError('Role not found', 400, 'ROLE_NOT_FOUND');
    }

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      phone,
      roleAssignments: [
        {
          roleId: role._id,
          assignedAt: new Date(),
        },
      ],
    });

    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      roles: [roleName],
    });

    res.status(201).json({
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        tokens,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).populate({
      path: 'roleAssignments.roleId',
      model: 'Role',
    });

    console.log(`[Login Attempt] Email: ${email}`);

    if (!user) {
      console.log(`[Login Failed] User not found: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await comparePassword(password, user.password);
    console.log(`[Login Attempt] Password Match: ${isMatch}`);

    if (!isMatch) {
      console.log(`[Login Failed] Password mismatch for: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Extract roles
    const roles = user.roleAssignments.map((ra: any) => ra.roleId.name);

    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      roles,
    });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          roles,
        },
        tokens,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const authRefresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400, 'REFRESH_TOKEN_REQUIRED');
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    const user = await User.findById(decoded.userId).populate('roleAssignments.roleId');
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const roles = user.roleAssignments.map((ra: any) => ra.roleId.name);

    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      roles,
    });

    res.json({
      message: 'Token refreshed successfully',
      data: { tokens },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
